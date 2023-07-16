import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import { SubjectsService } from "src/subjects/subjects.service"
import { TaskService } from 'src/task/task.service';
import { UsersService } from "src/users/users.service"

// проверяем, может ли юзер создавать задания
@Injectable()
export default class TaskGuard implements CanActivate {
    constructor (private readonly usersService: UsersService, private readonly subjectsService: SubjectsService, private readonly taskService: TaskService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { user } = context.switchToHttp().getRequest();
        const subjectId = request.body.id_subject;
        if (user.role.includes(Role.ADMIN)) {
            return true;
        }
        try {
            await this.subjectsService.findOne(Number(subjectId));
        } catch (error) {
            return false;
        }
        if (!user || !request.body) {
        
            return false;
        }

        const userId = user.id;
        const checkedUser = await this.usersService.getById(userId)
        const checkedSubject = await this.subjectsService.findOne(subjectId)
        // либо ты автор
    return (checkedUser.id === checkedSubject.id_teacher);
    }
}