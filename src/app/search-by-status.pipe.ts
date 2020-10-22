import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByStatus'
})
export class SearchByStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (((val.Priority.includes(args))));
      return rVal;
    })

  }
}
