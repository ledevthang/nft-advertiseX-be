import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("nft-adv");

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
