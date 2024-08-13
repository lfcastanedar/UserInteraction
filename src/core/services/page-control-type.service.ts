import { Injectable } from '@angular/core';
import { crudService } from './crud-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PageControlTypeService extends crudService {

  constructor(private _httpClient: HttpClient) {
    super('api/page_control_types', _httpClient);
  }
}