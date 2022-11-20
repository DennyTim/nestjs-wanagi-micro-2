import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  MicroserviceOptions,
  Transport
} from "@nestjs/microservices";
import { join } from "path";
import { AppModule } from "./app.module";

(async function() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: "subscribers",
      protoPath: join(process.cwd(), "src/subscribers/subscribers.proto"),
      url: configService.get("GRPC_CONNECTION_URL")
    }
  });

  app.startAllMicroservices();
})();
