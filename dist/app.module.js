"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const authentication_module_1 = require("./authentication/authentication.module");
const config_1 = require("@nestjs/config");
const Joi = require("@hapi/joi");
const users_module_1 = require("./users/users.module");
const subjects_module_1 = require("./subjects/subjects.module");
const photo_module_1 = require("./photo/photo.module");
const files_module_1 = require("./files/files.module");
const task_module_1 = require("./task/task.module");
const victorina_module_1 = require("./victorina/victorina.module");
const text_answer_module_1 = require("./text-answer/text-answer.module");
const option_module_1 = require("./option/option.module");
const question_module_1 = require("./question/question.module");
const user_answer_module_1 = require("./user-answer/user-answer.module");
const discipline_info_module_1 = require("./discipline-info/discipline-info.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            photo_module_1.PhotoModule,
            subjects_module_1.SubjectsModule,
            prisma_module_1.PrismaModule,
            users_module_1.UsersModule,
            authentication_module_1.AuthenticationModule,
            config_1.ConfigModule.forRoot({
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
            files_module_1.FilesModule,
            task_module_1.TaskModule,
            victorina_module_1.VictorinaModule,
            text_answer_module_1.TextAnswerModule,
            option_module_1.OptionModule,
            question_module_1.QuestionModule,
            user_answer_module_1.UserAnswerModule,
            discipline_info_module_1.DisciplineInfoModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map