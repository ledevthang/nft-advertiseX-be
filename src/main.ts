import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix("nft-adv");

  app.use("/nft-adv/static", express.static(join(__dirname, "..", "public")));

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("none")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("nft-adv/docs", app, document);

  await app.listen(8000);
}
bootstrap();
