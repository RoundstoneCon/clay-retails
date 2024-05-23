import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer, Consumer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumers: Consumer[] = [];

  constructor(clientId: string, brokers: string[]) {
    this.kafka = new Kafka({
      clientId,
      brokers,
    });

    this.producer = this.kafka.producer();
  }

  async sendMessage(topic: string, message: any) {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
    await this.producer.disconnect();
  }

  async consumeMessages(topic: string, groupId: string, handler: (message: any) => void) {
    const consumer = this.kafka.consumer({ groupId });
    this.consumers.push(consumer);
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        handler(JSON.parse(message.value.toString()));
      },
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}


// import { Injectable, OnModuleDestroy } from '@nestjs/common';
// import { Kafka, Producer, Consumer } from 'kafkajs';

// @Injectable()
// export class KafkaService implements OnModuleDestroy {
//   private kafka: Kafka;
//   private producer: Producer;
//   private consumer: Consumer;

//   constructor(clientId: string, brokers: string[]) {
//     this.kafka = new Kafka({
//       clientId,
//       brokers,
//     });

//     this.producer = this.kafka.producer();
//     this.consumer = this.kafka.consumer({ groupId: `${clientId}-group` });
//   }

//   async sendMessage(topic: string, message: string) {
//     await this.producer.connect();
//     await this.producer.send({
//       topic,
//       messages: [{ value: message }],
//     });
//     await this.producer.disconnect();
//   }

//   async consumeMessages(topic: string) {
//     await this.consumer.connect();
//     await this.consumer.subscribe({ topic, fromBeginning: true });
//     await this.consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         // Handle the received message
//         console.log({
//           topic,
//           partition,
//           value: message.value.toString(),
//         });
//       },
//     });
//   }

//   async onModuleDestroy() {
//     await this.producer.disconnect();
//     await this.consumer.disconnect();
//   }
// }
