import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { MaterialModule } from '@angular/material';
import { MdSnackBar} from '@angular/material';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

import { Weighin }                from './weighin';
import { DBService }         from './db.service';

@Component({
  selector: 'my-measurements',
  templateUrl: './measurements.component.html',
  styleUrls: [ './measurements.component.css' ]
})
export class MeasurementsComponent implements OnInit {
  source: LocalDataSource;
  weighins: Object[];
  selectedWeighin: Weighin;
  settings = {
  columns: {
		Date: {
		  title: 'Date'
		},
		Time: {
		  title: 'Time',
		  valuePrepareFunction: (value:string) => { 
			var hours = parseInt(value.substring(0,2));
			var minutes = value.substring(3,5); 
			var amPm = 'AM';
			if(hours-12>0)
			{
				hours = hours-12;
				amPm = 'PM';
			}
			
			return hours+":"+minutes+" "+amPm;		  
		  }
		},
		Participant: {
		  title: 'Participant'
		},
		BodyFat: {
		  title: 'Body Fat',
		  valuePrepareFunction: (value:number) => { return (value*100).toFixed(1)+' %' }
		},
		Weight: {
		  title: 'Weight',
		  valuePrepareFunction: (value:number) => { return value+' lbs' }
		},
		Viseral: {
		  title: 'Viseral Fat'
		},
		Waist: {
		  title: 'Waist',
		  valuePrepareFunction: (value:number) => { 
			var fraction = 8;
			var partialInches = value % 1;
			var inches = value-partialInches;
			var output='';
			partialInches = partialInches * fraction;
			if(partialInches == 0)
			{
				output=''+inches+'\"';
			}
			else
			{
				while((partialInches%2)==0)
				{
					partialInches = partialInches / 2;
					fraction = fraction / 2;
				}
				
				output=''+inches+' '+partialInches+'/'+fraction+'\"';

			}
			return output;		  }
		}, 
		Height: {
		  title: 'Height',
		  valuePrepareFunction: (value:number) => { //5.8333
			var inchesfraction = 12;
			var partialinchesfraction = 8;
			var inches = value % 1; //0.8333
			var feet = value-inches; //5
			var output='';
			var inchesOuput = '';
			inches = inches * inchesfraction; //9.9996
			inches = Math.ceil(inches*1000)/1000;
			var partialInches = (inches%1); //0.9996
			inches = inches - partialInches; 
			partialInches= partialInches*partialinchesfraction; 
			partialInches=partialInches-(partialInches%1);
			if(inches == 0)
			{
				output=''+feet+'\'';
			}
			else
			{
				if(partialInches != 0)
				{
				
					while((partialInches%2)==0)
					{
						partialInches = partialInches / 2;
						partialinchesfraction = partialinchesfraction / 2;
					}
					
					inchesOuput=''+inches+'\' '+partialInches+'/'+partialinchesfraction;

				}
				else
				{
					inchesOuput = ""+inches;
				}
					
				output=''+feet+'\' '+inches+'\"';

			}
			return output;		  }
		},
		Buddy: {
		  title: 'QA Buddy'
		},
		StartWeight: {
		  title: 'Official?',
		  valuePrepareFunction: (value:number) => { return value == 1 ? 'Start Weight' : 'No' }
		}
	  },
	  pager: {
		display: true,
		perPage: 30
	  },
	  attr: {
		id:"measurement-table",
		"class":"steveclass",
	  },
	  actions: {
		edit: false,
		add: false,
		delete: false
	  },
	  filter: {
		sort: true
	  },
	  noDataMessage: 'Loading Measurements ...'
	};
  	  
  constructor(
    private dbService: DBService,
    private router: Router,
	private _snackbar: MdSnackBar) {
	this.source = new LocalDataSource();
 }

  getWeighins(): void {
	this.dbService
        .getAllWeighins()
        .then((weighins) => { 
			this.weighins = weighins; 
			this.source.load(weighins);
		})
        .catch(this.handleError);
  }

  
  showSnackbar() {
    this._snackbar.open('YUM SNACKS', 'CHEW');
  }

  ngOnInit(): void {
	console.log("ngOnInit");
    this.getWeighins();
  }

  onSelect(weighin: Weighin): void {
    this.selectedWeighin = weighin;
  }
  
  add(): void {
    this.router.navigate(['/add']);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}

