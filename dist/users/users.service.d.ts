import { PrismaService } from '../prisma/prisma.service';
import CreateUserDto from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prismaService;
    findOne(arg0: number): void;
    remove(arg0: number): void;
    update(arg0: number, updateUserDto: UpdateUserDto): void;
    findOneById(arg0: number): void;
    constructor(prismaService: PrismaService);
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
    }, unknown> & {})[]>;
    getByEmail(email: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
    }, unknown> & {}>;
    create(studentData: CreateUserDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
    }, unknown> & {}>;
    getById(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        email: string;
        password: string;
    }, unknown> & {}>;
}
