import "dotenv/config";
import app from "./app.js";
import { connectKafka } from "./src/infrastructure/messaging/kafkaAdminService.js";
import { connectDB } from "./src/infrastructure/database/mongoConnection.js";

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  try {
    await connectDB();
    await connectKafka();
    app.listen(PORT, () => {
      console.log(`Posts service running on port ${PORT}....`);
    });
  } catch (error) {
    console.error("Bootstrap failed to start service:", error);
    process.exit(1);
  }
}

bootstrap();
