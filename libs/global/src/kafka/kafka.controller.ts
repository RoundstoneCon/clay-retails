import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { KafkaService } from './kafka.service';
@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}
  @Post('send/:topic')
  async sendKafkaMessage(
    @Param('topic') topic: string,
    @Body() message: { value: string },
  ) {
    await this.kafkaService.sendMessage(topic, message.value);
  }
  @Get('consume/:topic')
  async consumeKafkaMessages(
    @Param('topic') topic: string,
    groupId: string,
    handler: (message: any) => void,
  ) {
    await this.kafkaService.consumeMessages(topic, groupId, handler);
  }
}
