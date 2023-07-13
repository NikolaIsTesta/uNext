/// <reference types="node" />
import { PrismaService } from '../prisma/prisma.service';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilesService } from '../files/files.service';
export declare class UsersService {
    private readonly filesService;
    private readonly prismaService;
    constructor(filesService: FilesService, prismaService: PrismaService);
    static findOne(userId: any): void;
    remove(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").Role;
        id_avatar: number;
    }, unknown> & {}>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").Role;
        id_avatar: number;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").Role;
        id_avatar: number;
    }, unknown> & {})[]>;
    getByEmail(email: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").Role;
        id_avatar: number;
    }, unknown> & {}>;
    create(studentData: CreateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").Role;
        id_avatar: number;
    }, unknown> & {}>;
    getById(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").Role;
        id_avatar: number;
    }, unknown> & {}>;
    addAvatar(userId: number, imageBuffer: Buffer, filename: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        url: string;
        key: string;
    }, unknown> & {}>;
    getAvatar(userId: number): Promise<string>;
}
