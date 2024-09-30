import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enabled',
  standalone: true
})
export class EnabledPipe implements PipeTransform {

  transform(value: boolean): string {
    return value == true ? 'Activo' : 'Inactivo';
  }
}
