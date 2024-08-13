import { Injectable } from '@angular/core';
import { crudService } from './crud-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyCommissaryService extends crudService {

  constructor(private _httpClient: HttpClient) {
    super('api/family_commissaries', _httpClient);
  }
}
