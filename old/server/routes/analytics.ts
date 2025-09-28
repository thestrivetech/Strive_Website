import { Router } from "express";
import { db } from "../supabase";
import { 
  pageViews, 
  userSessions, 
  analyticsEvents, 
  webVitalsMetrics, 
  goalConversions,
  analyticsGoals,
  insertPageViewSchema,
  insertUserSessionSchema,
  insertAnalyticsEventSchema,
  insertWebVitalsMetricSchema
} from "../../shared/schema";
import { eq, desc, gte, lte, count, sql, and } from "drizzle-orm";
import { z } from "zod";

const router = Router();

// Utility functions
function getClientIP(req: any): string {
  return req.ip || 
         req.connection?.remoteAddress || 
         req.socket?.remoteAddress || 
         req.headers['x-forwarded-for']?.split(',')[0] || 
         'unknown';
}

function getUserAgent(req: any): string {
  return req.headers['user-agent'] || 'unknown';
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Track page view
router.post("/pageview", async (req, res) => {
  try {
    const data = insertPageViewSchema.parse({
      ...req.body,
      ipAddress: getClientIP(req),
      userAgent: getUserAgent(req),
    });

    const result = await db.insert(pageViews).values(data).returning();
    
    // Update session page view count
    if (data.sessionId) {
      await db
        .update(userSessions)
        .set({ 
          pageViews: sql`${userSessions.pageViews} + 1`,
          exitPage: data.path 
        })
        .where(eq(userSessions.sessionId, data.sessionId));
    }

    res.json({ success: true, id: result[0].id });
  } catch (error) {
    console.error("Error tracking page view:", error);
    res.status(400).json({ error: "Failed to track page view" });
  }
});

// Start or update user session
router.post("/session", async (req, res) => {
  try {
    const sessionData = insertUserSessionSchema.parse({
      ...req.body,
      ipAddress: getClientIP(req),
      userAgent: getUserAgent(req),
    });

    // Check if session exists
    const existingSession = await db
      .select()
      .from(userSessions)
      .where(eq(userSessions.sessionId, sessionData.sessionId))
      .limit(1);

    if (existingSession.length > 0) {
      // Update existing session
      const result = await db
        .update(userSessions)
        .set({
          endTime: new Date(),
          duration: sessionData.duration,
          pageViews: sessionData.pageViews,
          bounced: sessionData.bounced,
          converted: sessionData.converted,
          exitPage: sessionData.exitPage,
        })
        .where(eq(userSessions.sessionId, sessionData.sessionId))
        .returning();

      res.json({ success: true, session: result[0] });
    } else {
      // Create new session
      const result = await db.insert(userSessions).values(sessionData).returning();
      res.json({ success: true, session: result[0] });
    }
  } catch (error) {
    console.error("Error managing session:", error);
    res.status(400).json({ error: "Failed to manage session" });
  }
});

// Track analytics event
router.post("/event", async (req, res) => {
  try {
    const data = insertAnalyticsEventSchema.parse(req.body);
    const result = await db.insert(analyticsEvents).values(data).returning();
    res.json({ success: true, id: result[0].id });
  } catch (error) {
    console.error("Error tracking event:", error);
    res.status(400).json({ error: "Failed to track event" });
  }
});

// Track web vitals metrics
router.post("/web-vitals", async (req, res) => {
  try {
    const data = insertWebVitalsMetricSchema.parse({
      ...req.body,
      userAgent: getUserAgent(req),
    });

    const result = await db.insert(webVitalsMetrics).values(data).returning();
    res.json({ success: true, id: result[0].id });
  } catch (error) {
    console.error("Error tracking web vitals:", error);
    res.status(400).json({ error: "Failed to track web vitals" });
  }
});

// Get dashboard analytics data
router.get("/dashboard", async (req, res) => {
  try {
    const { timeframe = '7d' } = req.query;
    
    // Calculate date range
    const now = new Date();
    const startDate = new Date();
    switch (timeframe) {
      case '1d':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Get total page views
    const totalPageViews = await db
      .select({ count: count() })
      .from(pageViews)
      .where(gte(pageViews.timestamp, startDate));

    // Get unique sessions
    const uniqueSessions = await db
      .select({ count: count() })
      .from(userSessions)
      .where(gte(userSessions.startTime, startDate));

    // Get top pages
    const topPages = await db
      .select({
        path: pageViews.path,
        title: pageViews.title,
        views: count(),
      })
      .from(pageViews)
      .where(gte(pageViews.timestamp, startDate))
      .groupBy(pageViews.path, pageViews.title)
      .orderBy(desc(count()))
      .limit(10);

    // Get traffic sources
    const trafficSources = await db
      .select({
        source: pageViews.utmSource,
        visits: count(),
      })
      .from(pageViews)
      .where(and(
        gte(pageViews.timestamp, startDate),
        sql`${pageViews.utmSource} IS NOT NULL`
      ))
      .groupBy(pageViews.utmSource)
      .orderBy(desc(count()))
      .limit(10);

    // Get device breakdown
    const deviceBreakdown = await db
      .select({
        device: pageViews.device,
        visits: count(),
      })
      .from(pageViews)
      .where(gte(pageViews.timestamp, startDate))
      .groupBy(pageViews.device)
      .orderBy(desc(count()));

    // Get average session duration
    const avgSessionDuration = await db
      .select({
        avgDuration: sql<number>`AVG(${userSessions.duration})`,
      })
      .from(userSessions)
      .where(and(
        gte(userSessions.startTime, startDate),
        sql`${userSessions.duration} IS NOT NULL`
      ));

    // Get bounce rate
    const bounceRate = await db
      .select({
        bounceRate: sql<number>`AVG(CASE WHEN ${userSessions.bounced} THEN 1.0 ELSE 0.0 END) * 100`,
      })
      .from(userSessions)
      .where(gte(userSessions.startTime, startDate));

    // Get daily page views for chart
    const dailyPageViews = await db
      .select({
        date: sql<string>`DATE(${pageViews.timestamp})`,
        views: count(),
      })
      .from(pageViews)
      .where(gte(pageViews.timestamp, startDate))
      .groupBy(sql`DATE(${pageViews.timestamp})`)
      .orderBy(sql`DATE(${pageViews.timestamp})`);

    res.json({
      success: true,
      data: {
        summary: {
          totalPageViews: totalPageViews[0]?.count || 0,
          uniqueSessions: uniqueSessions[0]?.count || 0,
          avgSessionDuration: Math.round(avgSessionDuration[0]?.avgDuration || 0),
          bounceRate: Math.round(bounceRate[0]?.bounceRate || 0),
        },
        topPages,
        trafficSources,
        deviceBreakdown,
        dailyPageViews,
        timeframe,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

// Get real-time analytics
router.get("/realtime", async (req, res) => {
  try {
    // Get active sessions (last 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    
    const activeSessions = await db
      .select({ count: count() })
      .from(pageViews)
      .where(gte(pageViews.timestamp, thirtyMinutesAgo));

    // Get current top pages (last 30 minutes)
    const currentTopPages = await db
      .select({
        path: pageViews.path,
        title: pageViews.title,
        views: count(),
      })
      .from(pageViews)
      .where(gte(pageViews.timestamp, thirtyMinutesAgo))
      .groupBy(pageViews.path, pageViews.title)
      .orderBy(desc(count()))
      .limit(5);

    // Get recent events
    const recentEvents = await db
      .select({
        eventType: analyticsEvents.eventType,
        eventName: analyticsEvents.eventName,
        path: analyticsEvents.path,
        timestamp: analyticsEvents.timestamp,
      })
      .from(analyticsEvents)
      .where(gte(analyticsEvents.timestamp, thirtyMinutesAgo))
      .orderBy(desc(analyticsEvents.timestamp))
      .limit(10);

    res.json({
      success: true,
      data: {
        activeVisitors: activeSessions[0]?.count || 0,
        currentTopPages,
        recentEvents,
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching real-time data:", error);
    res.status(500).json({ error: "Failed to fetch real-time data" });
  }
});

// Get performance metrics
router.get("/performance", async (req, res) => {
  try {
    const { timeframe = '7d' } = req.query;
    
    const now = new Date();
    const startDate = new Date();
    switch (timeframe) {
      case '1d':
        startDate.setDate(now.getDate() - 1);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Get average performance metrics
    const performanceMetrics = await db
      .select({
        metricName: webVitalsMetrics.metricName,
        avgValue: sql<number>`AVG(${webVitalsMetrics.metricValue})`,
        goodCount: sql<number>`COUNT(CASE WHEN ${webVitalsMetrics.metricRating} = 'good' THEN 1 END)`,
        needsImprovementCount: sql<number>`COUNT(CASE WHEN ${webVitalsMetrics.metricRating} = 'needs-improvement' THEN 1 END)`,
        poorCount: sql<number>`COUNT(CASE WHEN ${webVitalsMetrics.metricRating} = 'poor' THEN 1 END)`,
        totalCount: count(),
      })
      .from(webVitalsMetrics)
      .where(gte(webVitalsMetrics.timestamp, startDate))
      .groupBy(webVitalsMetrics.metricName);

    res.json({
      success: true,
      data: {
        performanceMetrics,
        timeframe,
      },
    });
  } catch (error) {
    console.error("Error fetching performance data:", error);
    res.status(500).json({ error: "Failed to fetch performance data" });
  }
});

export default router;