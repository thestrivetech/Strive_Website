
// app/api/customers/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  status: z.enum(['LEAD', 'PROSPECT', 'ACTIVE', 'CHURNED']).default('LEAD'),
  source: z.enum(['WEBSITE', 'REFERRAL', 'SOCIAL', 'EMAIL', 'OTHER']).default('WEBSITE'),
  tags: z.array(z.string()).optional(),
  customFields: z.record(z.any()).optional()
})

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's organization(s)
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        organizationMembers: {
          include: { organization: true }
        }
      }
    })

    if (!user || user.organizationMembers.length === 0) {
      return NextResponse.json({ error: 'No organization found' }, { status: 403 })
    }

    const orgIds = user.organizationMembers.map(member => member.organizationId)

    const customers = await prisma.customer.findMany({
      where: {
        organizationId: { in: orgIds }
      },
      include: {
        assignedTo: {
          select: { name: true, email: true }
        },
        projects: {
          select: { id: true, name: true, status: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(customers)
  } catch (error) {
    console.error('Error fetching customers:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createCustomerSchema.parse(body)

    // Get user's primary organization
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        organizationMembers: {
          include: { organization: true }
        }
      }
    })

    if (!user || user.organizationMembers.length === 0) {
      return NextResponse.json({ error: 'No organization found' }, { status: 403 })
    }

    const organizationId = user.organizationMembers[0].organizationId

    const customer = await prisma.customer.create({
      data: {
        ...validatedData,
        organizationId,
        assignedTo: { connect: { id: user.id } }
      },
      include: {
        assignedTo: {
          select: { name: true, email: true }
        }
      }
    })

    // Log activity
    await prisma.activityLog.create({
      data: {
        organizationId,
        userId: user.id,
        action: 'customer_created',
        resourceType: 'customer',
        resourceId: customer.id,
        newData: customer,
        ipAddress: request.ip || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    })

    return NextResponse.json(customer, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }

    console.error('Error creating customer:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
