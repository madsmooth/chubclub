import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Weighin } from './weighin';
import { Participant } from './participant';
import { Measurement } from './measurement';

@Injectable()
export class DBService {

  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(private http: Http){
	// this.getWeighinsTest();
  }

  
  getWeighinsTest() {
	console.log('Test DB Service');
    this.http.get("http://thechub.club/getWeighins.php")
               .toPromise()
               .then(response => console.log(response))
               .catch(this.handleError);
	console.log('Test DB Service COMPLETED');
  }
  
  getAllWeighins(): Promise<Weighin[]> {
    return this.http.get("http://thechub.club/getAllWeighins.php")
               .toPromise()
               .then(response => response.json() as Weighin[])
               .catch(this.handleError);
  }
  
  getParticipants(): Promise<Participant[]> {
    return this.http.get("http://thechub.club/getParticipants.php")
               .toPromise()
               .then(response => response.json() as Participant[])
               .catch(this.handleError);
  }
  
  addNewWeighin(measurement: Measurement): Promise<Object> {
    var url = 'addMeasurement.php?'+'DATE='+measurement.Date+'&TIME='+measurement.Time+'&PARTICIPANT_ID='+measurement.Participant+'&BODYFAT='+measurement.BodyFat+'&WEIGHT='+measurement.Weight+'&VISERAL='+measurement.Viseral+'&WAIST='+measurement.Waist+'&TOOL='+measurement.Tool+'&BUDDY_ID='+measurement.Buddy+'&START_WEIGHT=0';
	
	return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
    
  getOfficialWeighins(): Promise<Weighin[]> {
    return this.http.get("http://thechub.club/getOfficialWeighins.php")
               .toPromise()
               .then(response => response.json() as Weighin[])
               .catch(this.handleError);
  }

 
  getWeighinChartData(): Promise<any[]> {
    return this.http.get("http://thechub.club/getChartData.php")
               .toPromise()
               .then(response => response.json() as any[])
               .catch(this.handleError);
  }
  
  getWeighinKeyValueXYData(): Promise<any[]> {
    return this.http.get("http://thechub.club/getWeighinKeyValueXYData.php")
               .toPromise()
               .then(response => response.json() as any[])
               .catch(this.handleError);
  }
    
  getLatestWeighins(): Promise<Weighin[]> {
    return this.http.get("http://thechub.club/getLatestWeighins.php")
               .toPromise()
               .then(response => response.json() as Weighin[])
               .catch(this.handleError);
  }
 
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}

