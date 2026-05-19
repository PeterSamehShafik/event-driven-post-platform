import { Kafka } from 'kafkajs';

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

const consumer = kafka.consumer({
    groupId: process.env.KAFKA_GROUP_ID,
    // partitionAssigners:[[Assigners.cooperativeSticky]]
});

export { kafka, consumer };