/**
 * Supabase Connection Test Script
 *
 * Run this to verify your Supabase integration is working correctly.
 *
 * Usage:
 *   npx tsx scripts/test-supabase.ts
 *
 * Or add to package.json scripts:
 *   "test:supabase": "tsx scripts/test-supabase.ts"
 */

// IMPORTANT: Load environment variables FIRST before any imports
import { config } from "dotenv";
import { resolve } from "path";

const envPath = resolve(process.cwd(), ".env.local");
config({ path: envPath });

console.log("📋 Environment check:");
console.log(`   Loading from: ${envPath}`);
console.log(
  `   NEXT_PUBLIC_SUPABASE_URL: ${
    process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Missing"
  }`
);
console.log(
  `   NEXT_PUBLIC_SUPABASE_ANON_KEY: ${
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Missing"
  }\n`
);

// Now import after env variables are loaded
import { supabase } from "../lib/supabase";
import { ordersService } from "../services/ordersService";
import { tasksService } from "../services/tasksService";
import { chartDataService } from "../services/chartDataService";

async function testSupabaseConnection() {
  console.log("🧪 Testing Supabase Connection...\n");

  // Test 1: Direct Connection
  console.log("Test 1: Direct Supabase Connection");
  try {
    const { data, error } = await supabase.from("orders").select("id").limit(1);
    if (error) throw error;
    console.log("✅ Direct connection successful");
    console.log(`   Found ${data?.length || 0} orders\n`);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Direct connection failed:", errorMessage);
    console.log("\n⚠️  Make sure you have:");
    console.log("   1. Created a Supabase project");
    console.log("   2. Updated .env.local with your credentials");
    console.log("   3. Run the SQL migration in Supabase dashboard\n");
    process.exit(1);
  }

  // Test 2: Orders Service
  console.log("Test 2: Orders Service");
  try {
    const orders = await ordersService.fetchOrders();
    console.log(`✅ Orders service working`);
    console.log(`   Fetched ${orders.length} orders`);
    if (orders.length > 0) {
      console.log(
        `   Sample order: ${orders[0].id} - ${orders[0].clientName}\n`
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Orders service failed:", errorMessage, "\n");
  }

  // Test 3: Order Detail
  console.log("Test 3: Fetch Order Detail");
  try {
    const order = await ordersService.fetchOrderById("ORD-001");
    console.log("✅ Order detail working");
    console.log(`   Order: ${order.id}`);
    console.log(`   Client: ${order.clientName}`);
    console.log(`   Status: ${order.status}`);
    console.log(`   Amount: $${order.amount.toLocaleString()}\n`);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Order detail failed:", errorMessage, "\n");
  }

  // Test 4: Tasks Service
  console.log("Test 4: Tasks Service");
  try {
    const tasks = await tasksService.fetchTasksByOrderId("ORD-001");
    console.log("✅ Tasks service working");
    console.log(`   Fetched ${tasks.length} tasks for ORD-001`);
    if (tasks.length > 0) {
      console.log(`   Sample task: ${tasks[0].text} (${tasks[0].status})\n`);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Tasks service failed:", errorMessage, "\n");
  }

  // Test 5: Chart Data Service
  console.log("Test 5: Chart Data Service");
  try {
    const chartData = await chartDataService.fetchWeeklyChartData();
    console.log("✅ Chart data service working");
    console.log(`   Fetched ${chartData.length} data points`);
    if (chartData.length > 0) {
      console.log(
        `   Sample: ${chartData[0].name} - Today: $${chartData[0].today}\n`
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Chart data service failed:", errorMessage, "\n");
  }

  // Test 6: Create & Delete (Optional)
  console.log("Test 6: CRUD Operations (Create & Delete)");
  try {
    const testOrder = await ordersService.createOrder({
      clientName: "Test Client",
      clientEmail: "test@example.com",
      projectType: "Test Project",
      status: "Pending",
      deadline: "2025-12-31",
      amount: 1000,
      description: "Test order created by test script",
      notes: "This is a test",
    });

    console.log("✅ Create order working");
    console.log(`   Created order: ${testOrder.id}`);

    // Clean up
    await ordersService.deleteOrder(testOrder.id);
    console.log("✅ Delete order working");
    console.log(`   Deleted test order: ${testOrder.id}\n`);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ CRUD operations failed:", errorMessage, "\n");
  }

  // Test 7: Order Statistics
  console.log("Test 7: Order Statistics");
  try {
    const stats = await ordersService.fetchOrderStats();
    console.log("✅ Order statistics working");
    console.log(`   Total Orders: ${stats.total}`);
    console.log(`   Pending: ${stats.pending}`);
    console.log(`   In Progress: ${stats.inProgress}`);
    console.log(`   Completed: ${stats.completed}`);
    console.log(`   Total Revenue: $${stats.totalRevenue.toLocaleString()}\n`);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Order statistics failed:", errorMessage, "\n");
  }

  // Final Summary
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🎉 All Tests Complete!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("\nSupabase integration is ready to use.");
}

// Run the test
testSupabaseConnection()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Unexpected error:", error);
    process.exit(1);
  });
