import { truncate } from "fs/promises";
import { consumer } from "./kafkaClient.js";

class KafkaConsumer {
    constructor(handler) {
        this.handler = handler
    }
    async start() {
        await consumer.connect()
        await consumer.subscribe({
            topic: process.env.POST_CREATED_TOPIC,
            fromBeginning: truncate,
        })
        console.log('Kafka consumer connected and subscribed');

        await consumer.run({
            autoCommit: false,
            eachMessage: async ({ topic, partition, message }) => {
                try {
                    const raw = message.value.toString()
                    const event = JSON.parse(raw)
                    console.log('Event Received', {
                        topic,
                        partition,
                        offset: message.offset,
                    });
                    await this.handler.handle(event)
                } catch (error) {
                    console.error('Failed to process message', {
                        error: err.message,
                        topic,
                        partition,
                        offset: message.offset,
                    });
                }
            }
        },)
    }
}

export default KafkaConsumer;
