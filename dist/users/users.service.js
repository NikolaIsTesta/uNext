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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const files_service_1 = require("../files/files.service");
let UsersService = exports.UsersService = class UsersService {
    constructor(filesService, prismaService) {
        this.filesService = filesService;
        this.prismaService = prismaService;
    }
    static findOne(userId) {
        throw new Error('Method not implemented.');
    }
    async remove(id) {
        return await this.prismaService.user.delete({
            where: { id: id },
        });
    }
    async update(id, updateUserDto) {
        return await this.prismaService.user.update({
            where: { id: id },
            data: updateUserDto,
        });
    }
    async findAll() {
        return await this.prismaService.user.findMany();
    }
    async getByEmail(email) {
        const student = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (student) {
            return student;
        }
        throw new common_1.HttpException('User with this email does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async create(studentData) {
        const defaultFile = await this.filesService.getById(1);
        if (!defaultFile)
            await this.filesService.create(undefined);
        const newUser = await this.prismaService.user.create({
            data: studentData,
        });
        return newUser;
    }
    async getById(id) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('User with this id does not exist', common_1.HttpStatus.NOT_FOUND);
    }
    async addAvatar(userId, imageBuffer, filename) {
        const avatar = await this.filesService.uploadPublicFile(imageBuffer, filename);
        const user = await this.getById(userId);
        if (user.id_avatar != 1)
            this.filesService.deletePublicFile(user.id_avatar);
        user.id_avatar = avatar.id;
        await this.prismaService.user.update({
            where: { id: userId },
            data: user
        });
        return avatar;
    }
    async getAvatar(userId) {
        const user = await this.getById(userId);
        const file = this.filesService.getById(user.id_avatar);
        return (await file).url;
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [files_service_1.FilesService,
        prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map