import { Injectable } from '@angular/core';
import { crudService } from './crud-service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WorkflowService extends crudService {

  constructor(private _httpClient: HttpClient) {
    super('api/workflows', _httpClient);
  }

  getWorkFlowHistories(address: string | undefined){
    return this.http.get(`${ this.environment }/${ this.apiUrl }/workflow_histories/${ address }`);
  }

  getStepsByAddress(contractAddress: string | undefined) {
    return this._httpClient.get<any>(`${ this.environment }/${ this.apiUrl }/get_steps/${contractAddress}`);
  }
}
