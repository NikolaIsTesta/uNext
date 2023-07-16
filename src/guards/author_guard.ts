import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import { SubjectsService } from "src/subjects/subjects.service"
import { UsersService } from "src/users/users.service"

// проверяем, может ли пользователь работать с предметами
@Injectable()
export default class AuthorGuard implements CanActivate {
    constructor (private readonly usersService: UsersService, private readonly subjectsService: SubjectsService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const {user, params} = context.switchToHttp().getRequest();
        try {
            await this.subjectsService.findOne(Number(params.id));
        } catch (error) {
            console.log(user);
            return false;
        }
        if (!user || !params) {
            return false;
        }
        // либо ты админ
        if (user?.role.includes(Role.ADMIN)) {
            return true;
        }

        const userId = user.id;
        const subjectsId = Number(params.id);
        const checkedUser = await this.usersService.getById(userId)
        const checkedSubject = await this.subjectsService.findOne(subjectsId)
        
        // либо ты учитель
        return (checkedUser.id === checkedSubject.id_teacher);    
    }
}