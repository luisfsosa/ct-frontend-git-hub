import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'questionableBoolean'
})
export class QuestionableBooleanPipe implements PipeTransform {

  transform(value: string): string {
    if(value=='0'){
      return 'No';
    }
    else {
      return 'Si';
    }
  };
}
