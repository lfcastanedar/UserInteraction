import { Injectable } from '@angular/core';
import { crudService } from './crud-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonTypeService extends crudService {

  constructor(private _httpClient: HttpClient) {
    super('api/person_types', _httpClient);
  }
}
