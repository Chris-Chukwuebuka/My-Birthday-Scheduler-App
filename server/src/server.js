const http = require("http");
const app = require("./app");
const httpServer = http.createServer(app);
const { PORT } = require("./config/dotEnv");
const connectDb = require("./utils/dbConnect")
const cron = require("node-cron");
const {
  sendBirthdayMessage,
  sendADayReminderToAdmin,
  sendMonthlyReminder,
} = require("./services/reminderServices");



// Schedule the sendBirthdayReminder function to run every day at 8:00 AM
cron.schedule(
  "0 13 * * *",
  async () => {
    await sendBirthdayMessage();
    await sendADayReminderToAdmin();
  },
  {
    scheduled: true,
    timezone: "Africa/Lagos", // e.g., 'Central African Timezone'
  }
);

// Schedule the sendMonthlyReminder function to run every 1st day of the month at 10:00 AM
cron.schedule("0 13 1 * *", async () => {
  await sendMonthlyReminder();
});
// Start the server
const startServer = async () => {
  await connectDb();
  httpServer.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
