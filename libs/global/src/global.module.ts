import { Module } from '@nestjs/common';
import { GlobalService } from './global.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  providers: [GlobalService],
  exports: [GlobalService],
  imports: [KafkaModule],
})
export class GlobalModule {}
