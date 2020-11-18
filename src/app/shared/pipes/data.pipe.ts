import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { MyserviceService } from '../service/myservice.service';
@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {
  constructor(private myserviceService: MyserviceService) { }

    transform(value: any, format: string): unknown {

        if (!value) { return ''; }
        if (!format) { format = 'shortDate'; }

        return formatDate(value, format, 'en-US');
    }

}
