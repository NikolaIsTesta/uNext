import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class SubjectsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createSubjectDto: CreateSubjectDto): string;
    findAll(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
    }, unknown> & {})[]>;
    findOne(id: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
    }, unknown> & {}>;
    update(id: number, updateSubjectDto: UpdateSubjectDto): string;
    remove(id: number): string;
}
