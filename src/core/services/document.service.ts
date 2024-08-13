import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crudService } from './crud-service';

import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService extends crudService {


  constructor(private _httpClient: HttpClient) {
    super('api/documents', _httpClient);
  }

  PostSearch(data: any) {
    return this.http.post(`${this.environment}/${this.apiUrl}/search`, data).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  PostSearchInWeb(data: any) {
    return this.http.post(`${this.environment}/${this.apiUrl}/search_in_web`, data).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  PostSearchInWebByPerson(data: any) {
    return this.http.post(`${this.environment}/${this.apiUrl}/search_in_web_by_person`, data).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  
  GetDetailByAddress(address: string | undefined) {
    return this.http.get<any>(`${this.environment}/${this.apiUrl}/details_by_smart_contract/${address}`);
}

}
