import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByPriorityStatus'
})
export class FilterByPriorityStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // alert("kk: "+args[0]+"\n"+args[1]);
    return value;
  }

}
