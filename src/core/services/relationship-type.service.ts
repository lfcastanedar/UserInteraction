import { Injectable } from '@angular/core';
import { crudService } from './crud-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelationshipTypeService extends crudService {

  constructor(private _httpClient: HttpClient) {
    super('api/relationship_types', _httpClient);
  }
}
