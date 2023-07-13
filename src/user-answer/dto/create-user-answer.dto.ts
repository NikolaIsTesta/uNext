import { IsDate, IsNumber, IsString } from 'class-validator';
export class CreateUserAnswerDto {
    // автоматически присваивается юзеру, который вызвал метод create
    id_student:     number
    // думаю стоит попробовать как-то достать этот айдишник с помощью методов
    id_task:        number
    // нужно выссчитать с помощью методов(методы для обработки ответов не написаны еще)
    id_textAnswer:  number
    id_optionAnswer:number
}
export default CreateUserAnswerDto;