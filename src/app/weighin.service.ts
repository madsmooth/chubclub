import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Weighin } from './weighin';

@Injectable()
export class WeighinService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getWeighins(): Promise<Weighin[]> {
    return this.http.get("http://chubclub.madsmooth.com/getWeighins.php")
               .toPromise()
               .then(response => response.json() as Weighin[])
               .catch(this.handleError);
  }
  
  getWeighin(id: number): Promise<Weighin> {
    const url = `${"getWeighin.php"}/${id}`;
    return this.http.get("getWeighin.php")
      .toPromise()
      .then(response => response.json().data as Weighin)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

