import app from './app.js'
import { connectDB } from './src/infrastructure/database/mongoConnection.js'
import { kafkaConsumer } from './src/container/index.js'
import "dotenv/config";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    await connectDB();
    await kafkaConsumer.start();

    app.listen(PORT, () => {
      console.log(`Notification service running on port ${PORT}....`);
    });
  } catch (error) {
    console.error("Bootstrap failed to start notification service:", error);
    process.exit(1);
  }
}

bootstrap();