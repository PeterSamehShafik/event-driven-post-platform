import { kafka, producer } from "./kafkaClient.js";

// Create topics if not created
export async function initializeTopics() {
  const admin = kafka.admin();

  try {
    console.log("Connecting to Kafka Admin Client...");
    await admin.connect();
    const targetTopic = process.env.POST_CREATED_TOPIC;
    const existingTopics = await admin.listTopics();

    if (!existingTopics.includes(targetTopic)) {
      console.log(`Creating Topic "${targetTopic}"`);

      await admin.createTopics({
        topics: [
          {
            topic: targetTopic,
            numPartitions: 3,
            replicationFactor: 1,
          },
        ],
        
      });
      console.log(`Topic "${targetTopic}" created successfully.`);
    } else {
      console.log(`Topic "${targetTopic}" verified inside cluster.`);
    }
  } catch (error) {
    console.error("Failed to initialize Kafka topics:", error);
    throw error;
  } finally {
    await admin.disconnect();
  }
}

export async function connectKafka() {
  await initializeTopics();
  await producer.connect();
}
