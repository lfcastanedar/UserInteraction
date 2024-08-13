import { Injectable } from '@angular/core';
import { crudService } from './crud-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HealthPromotingEntityService extends crudService {

  constructor(private _httpClient: HttpClient) {
    super('api/health_promoting_entity', _httpClient);
  }
}
