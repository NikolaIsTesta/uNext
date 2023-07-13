import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SubjectsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createSubjectDto: CreateSubjectDto, userId: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        description: string;
        id_teacher: number;
        createdAt: Date;
        storage: string;
        deadline: Date;
    }, unknown> & {}>;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        description: string;
        id_teacher: number;
        createdAt: Date;
        storage: string;
        deadline: Date;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        description: string;
        id_teacher: number;
        createdAt: Date;
        storage: string;
        deadline: Date;
    }, unknown> & {}>;
    update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        description: string;
        id_teacher: number;
        createdAt: Date;
        storage: string;
        deadline: Date;
    }, unknown> & {}>;
    remove(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        description: string;
        id_teacher: number;
        createdAt: Date;
        storage: string;
        deadline: Date;
    }, unknown> & {}>;
    getByName(name: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        description: string;
        id_teacher: number;
        createdAt: Date;
        storage: string;
        deadline: Date;
    }, unknown> & {}>;
}
