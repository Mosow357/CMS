import { Module } from "@nestjs/common";
import { EncoderService } from "./services/encoder.service";

@Module({
  providers: [EncoderService],
  controllers: [],
  imports: [],
  exports: [EncoderService],
})
export class CommonModule {}
