import { Kafka, Partitioners } from "kafkajs";

//compression setup
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const SnappyCodec = require('kafkajs-snappy')
const { CompressionTypes, CompressionCodecs } = require('kafkajs');
CompressionCodecs[CompressionTypes.Snappy] = SnappyCodec


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

const producer = kafka.producer({
  createPartitioner: Partitioners.DefaultPartitioner, // in case not sending a key
  idempotent: true,
  maxInFlightRequests: 5,
  // transactionalId: 'my-transactional-producer',
});

export { kafka, producer, CompressionTypes };
