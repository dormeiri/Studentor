import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { BaseCrudModel } from '../models/base-crud-model';

export class BaseCrudService<T extends BaseCrudModel> {

    private baseUrl: string;
    protected dataUpdatedSource = new Subject();

    dataUpdated$ = this.dataUpdatedSource.asObservable();


    constructor(relativeUrl: String, protected http: HttpClient) {
        this.baseUrl = `${environment.apiUrl}/${relativeUrl}`;
    }


    public getAll(): Observable<T[] | HttpErrorResponse> {
        return this.http.get<T[]>(this.baseUrl);
    }

    public get(id: String): Observable<T | HttpErrorResponse> {
        return this.http.get<T>(`${this.baseUrl}/${id}`);
    }

    public post(data: T): Observable<any> {
        return this.http.post(this.baseUrl, data)
            .pipe(tap(() => this.dataUpdatedSource.next()));
    }

    public put(data: T): Observable<any> {
        return this.http.put(`${this.baseUrl}/${data._id}`, data)
            .pipe(tap(() => this.dataUpdatedSource.next()));
    }

    public delete(id: String): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`)
            .pipe(tap(() => this.dataUpdatedSource.next()));
    }
}
