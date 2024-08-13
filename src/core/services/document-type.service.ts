import { Injectable } from '@angular/core';
import { crudService } from './crud-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService extends crudService {

  constructor(private _httpClient: HttpClient) {
    super('api/document_types', _httpClient);
  }

  getListForSearch() {
    return this._httpClient.get<any>(`${ this.environment }/${ this.apiUrl }/list_for_search`);
  }
}
