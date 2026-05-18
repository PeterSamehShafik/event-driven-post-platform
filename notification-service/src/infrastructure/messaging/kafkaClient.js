import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS],
    retry: {
        initialRetryTime: 300,
        retries: 5,
        factor: 2,
        maxRetryTime: 10000,
    },
});

const consumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID,
});

export { kafka, consumer };