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
let UsersService = exports.UsersService = class UsersService {
    findOne(arg0) {
        throw new Error('Method not implemented.');
    }
    remove(arg0) {
        throw new Error('Method not implemented.');
    }
    update(arg0, updateUserDto) {
        throw new Error('Method not implemented.');
    }
    findOneById(arg0) {
        throw new Error('Method not implemented.');
    }
    constructor(prismaService) {
        this.prismaService = prismaService;
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
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map