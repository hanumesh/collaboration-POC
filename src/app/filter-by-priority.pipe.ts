import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByPriority'
})
export class FilterByPriorityPipe implements PipeTransform {

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
