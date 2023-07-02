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
let SubjectsService = exports.SubjectsService = class SubjectsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    create(createSubjectDto) {
        return 'This action adds a new subject';
    }
    async findAll() {
        return await this.prismaService.subjects.findMany();
    }
    async findOne(id) {
        const subject = await this.prismaService.subjects.findUnique({
            where: {
                id,
            },
        });
        return subject;
    }
    update(id, updateSubjectDto) {
        return `This action updates a #${id} subject`;
    }
    remove(id) {
        return `This action removes a #${id} subject`;
    }
};
exports.SubjectsService = SubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubjectsService);
//# sourceMappingURL=subjects.service.js.map