import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [
    process.env.MODE === "DEV"
      ? process.env.KAFKA_BOOTSTRAP_SERVERS_DEV
      : process.env.KAFKA_BOOTSTRAP_SERVERS,
  ],
  retry: {
    initialRetryTime: 300,
    retries: 5,
    factor: 2,
    maxRetryTime: 10000,
  },
});

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner,
});

export { kafka, producer };
