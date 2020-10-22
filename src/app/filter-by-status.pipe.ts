import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // alert("kk: "+args);
   /* if(args == ''){
      alert("kishore");
    } */
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (((val.Status.includes(args))));
      return rVal;
    })

  }
}
