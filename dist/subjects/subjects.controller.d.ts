import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    create(createSubjectDto: CreateSubjectDto, request: RequestWithUser): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        description: string;
        id_teacher: number;
        createdAt: Date;
        storage: string;
        deadline: Date;
    }, unknown> & {}>;
    findOne(id: string): Promise<import("@prisma/client/runtime").GetResult<{
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
    update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        description: string;
        id_teacher: number;
        createdAt: Date;
        storage: string;
        deadline: Date;
    }, unknown> & {}>;
    remove(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        description: string;
        id_teacher: number;
        createdAt: Date;
        storage: string;
        deadline: Date;
    }, unknown> & {}>;
}
