"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const postgresErrorCode_enum_1 = require("../database/postgresErrorCode.enum");
let SubjectsService = exports.SubjectsService = class SubjectsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createSubjectDto, userId) {
        try {
            createSubjectDto.id_teacher = userId;
            return await this.prismaService.subject.create({
                data: createSubjectDto,
            });
        }
        catch (error) {
            if (error?.code === postgresErrorCode_enum_1.default.UniqueViolation) {
                throw new common_1.HttpException('Subject with that name already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        return await this.prismaService.subject.findMany();
    }
    async findOne(id) {
        const subject = await this.prismaService.subject.findUnique({
            where: {
                id,
            },
        });
        if (subject) {
            return subject;
        }
        throw new common_1.HttpException('Subject with this id does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async update(id, updateSubjectDto) {
        return await this.prismaService.subject.update({
            where: { id: id },
            data: updateSubjectDto,
        });
    }
    async remove(id) {
        return await this.prismaService.subject.delete({
            where: { id: id },
        });
    }
    async getByName(name) {
        const subjects = await this.prismaService.subject.findUnique({
            where: {
                name,
            },
        });
        if (subjects) {
            return subjects;
        }
        throw new common_1.HttpException('Subject with this name does not exist', common_1.HttpStatus.NOT_FOUND);
    }
};
exports.SubjectsService = SubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubjectsService);
//# sourceMappingURL=subjects.service.js.map