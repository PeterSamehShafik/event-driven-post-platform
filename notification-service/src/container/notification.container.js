
import NotificationRepository from '../infrastructure/database/repositories/NotificationRepository.js';
import ProcessPostCreated from '../application/usecases/ProcessPostCreated.js';
import KafkaConsumer from '../infrastructure/messaging/KafkaConsumer.js';

const notificationRepository = new NotificationRepository();
const processPostCreated = new ProcessPostCreated(notificationRepository);
const kafkaConsumer = new KafkaConsumer(processPostCreated)


export { kafkaConsumer }