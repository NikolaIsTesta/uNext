let questions = await this.prismaService.question.findMany(
      {
        include: {
          textAnswers:{
            select: {
              mark:true
            }
          },
          victorines: true
        },
      }
    );
   
    console.log(questions);
    
    let taskTotalMark = 0;
    // questions.forEach(async question=>{
    //   if(question.type == "VICTORINA"){
    //     const victorina = await this.prismaService.victorina.findMany({where: {
    //       id_question: question.id,
    //     }});
    const sumTextAnswers = this.prismaService.question.aggregate({
      _max: {
        select: {
          textAnswer: {
            select: {
              mark: true
            }
          },
        }
      },
    })
          const options =  this.prismaService.option.aggregate({
            _max: {
              mark: true
            },
          }
          );
          taskTotalMark = (await options)._max.mark;
        
      
      // if(question.type=="TEXTANSWER"){
      //   const textAnswers = await this.prismaService.textAnswer.findMany({where: {
      //     id_question: question.id,
      //   }});
      //   textAnswers.forEach(textAnswer=>{
      //     taskTotalMark+=textAnswer.mark;
      //   })
      // }
   
    return questions;