"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = require("aws-sdk");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: { origin: 'http://localhost:8080', credentials: true },
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(cookieParser());
    const configService = app.get(config_1.ConfigService);
    aws_sdk_1.config.update({
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        region: configService.get('AWS_REGION'),
    });
    const Swaggerconfig = new swagger_1.DocumentBuilder()
        .setTitle('Only-up')
        .setDescription('Сваггеры-папашеры')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, Swaggerconfig);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map