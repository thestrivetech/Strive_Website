// Test Authentication Flow Script
// This script tests the authentication system

const testEmail = 'test@strivetech.ai';
const testPassword = 'testPassword123!';

async function testAuthFlow() {
  console.log('🔐 Testing Authentication Flow\n');
  console.log('==========================================');

  // 1. Test login endpoint
  console.log('\n1. Testing login endpoint...');
  console.log(`   Email: ${testEmail}`);
  console.log(`   Password: [hidden]`);

  try {
    const loginResponse = await fetch('http://localhost:3002/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });

    if (loginResponse.ok) {
      const data = await loginResponse.json();
      console.log('   ✅ Login successful!');
      console.log(`   User ID: ${data.user?.id}`);
      console.log(`   User Name: ${data.user?.name}`);
      console.log(`   User Role: ${data.user?.role}`);
    } else {
      const error = await loginResponse.json();
      console.log(`   ❌ Login failed: ${error.error}`);
      console.log('\n   Note: Please ensure a test user exists in Supabase with these credentials.');
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  // 2. Test protected route
  console.log('\n2. Testing protected route (dashboard)...');
  try {
    const dashboardResponse = await fetch('http://localhost:3002/dashboard', {
      redirect: 'manual',
    });

    if (dashboardResponse.status === 307) {
      console.log('   ✅ Protected route correctly redirects to login when not authenticated');
    } else {
      console.log(`   ℹ️  Protected route returned status: ${dashboardResponse.status}`);
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }

  console.log('\n==========================================');
  console.log('\n✨ Authentication flow test complete!\n');
  console.log('To create a test user:');
  console.log('1. Go to your Supabase dashboard');
  console.log('2. Navigate to Authentication > Users');
  console.log('3. Click "Invite User"');
  console.log(`4. Enter email: ${testEmail}`);
  console.log(`5. Set password: ${testPassword}`);
  console.log('6. Run this script again to test login\n');
}

testAuthFlow();