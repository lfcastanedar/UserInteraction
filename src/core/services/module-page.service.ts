import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crudService } from './crud-service'

@Injectable({
  providedIn: 'root'
})
export class ModulePageService extends crudService {

  constructor(private _httpClient: HttpClient) {
    super('api/model_pages', _httpClient);
  }
}
