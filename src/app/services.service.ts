import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'https://us-south.functions.cloud.ibm.com/api/v1/web/psas_psas/default/teste.json';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  constructor(private http: HttpClient) {
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getProducts() {
    return this.http.get(endpoint).pipe(
      map(this.extractData));
  }

}
