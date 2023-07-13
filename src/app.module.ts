import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { UsersModule } from './users/users.module';
import { SubjectsModule } from './subjects/subjects.module';
import { PhotoModule } from './photo/photo.module';
import { FilesModule } from './files/files.module';
import { TaskModule } from './task/task.module';
import { VictorinaModule } from './victorina/victorina.module';
import { TextAnswerModule } from './text-answer/text-answer.module';
import { OptionModule } from './option/option.module';
import { QuestionModule } from './question/question.module';
import { UserAnswerModule } from './user-answer/user-answer.module';
import { DisciplineInfoModule } from './discipline-info/discipline-info.module';

@Module({
  imports: [
    PhotoModule,
    SubjectsModule,
    PrismaModule,
    UsersModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        PORT: Joi.number(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
      }),
    }),
    FilesModule,
    TaskModule,
    VictorinaModule,
    TextAnswerModule,
    OptionModule,
    QuestionModule,
    UserAnswerModule,
    DisciplineInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
