import { Injectable } from '@angular/core';
import { crudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class ControlPageService  extends crudService {

  constructor(private _httpClient: HttpClient) {
    super('api/control_pages', _httpClient);
  }


  getPageControls(contractAddress: string | undefined) {
    return this._httpClient.get<any>(`${ this.environment }/${ this.apiUrl }/get_page_controls/${contractAddress}`);
  }

  getDocument(data: any) {
    return this._httpClient.post(`${this.environment}/${this.apiUrl}/get_document`, data).pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  getDocumentFolder(data: any) {
    return this._httpClient.post(`${this.environment}/${this.apiUrl}/get_document_folder`, data).pipe(
        map((result: any) => {
            return result;
        })
    );
}
}