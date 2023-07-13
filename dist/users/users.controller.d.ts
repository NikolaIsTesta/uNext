/// <reference types="multer" />
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").Role;
        id_avatar: number;
    }, unknown> & {})[]>;
    findOne(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").Role;
        id_avatar: number;
    }, unknown> & {}>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").Role;
        id_avatar: number;
    }, unknown> & {}>;
    remove(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").Role;
        id_avatar: number;
    }, unknown> & {}>;
    addAvatar(request: RequestWithUser, file: Express.Multer.File): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        url: string;
        key: string;
    }, unknown> & {}>;
    getAvatar(request: RequestWithUser): Promise<string>;
}
