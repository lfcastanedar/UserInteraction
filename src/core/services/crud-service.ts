import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators"
import { HttpClient } from '@angular/common/http';

export class crudService {
    private api_url: string = '';
    private _http: HttpClient;

    get environment(): string { return environment.url }
    get apiUrl(): string { return this.api_url }

    get http(): HttpClient {return this._http}


    constructor(api_url: string, _http: HttpClient){
        this.api_url = api_url;
        this._http = _http;
    }

    getAll() {
        return this._http.get<any>(`${this.environment}/${this.api_url}`);
    }

    getById(id: string | undefined) {
        return this._http.get<any>(`${this.environment}/${this.api_url}/${id}`);
    }

    create<T>(data: T) {
        return this._http.post(`${this.environment}/${this.api_url}`, data).pipe(
            map((result: any) => {
                return result;
            })
        );
    }

    edit<T>(data: T, id: string) {
        return this._http.put(`${this.environment}/${this.api_url}/${id}`, data).pipe(
            map((result: any) => {
                return result;
            })
        );
    }

    delete(id: string) {
        return this._http.delete(`${this.environment}/${this.api_url}/${id}`).pipe(
            map((result: any) => {
                return result;
            })
        );
    }
}