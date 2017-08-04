import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { MaterialModule } from '@angular/material';
import {FormsModule } from '@angular/forms';
import {SpinnerModule} from 'primeng/primeng';

import { AppComponent }                from './app.component';
import { Weighin }                from './weighin';
import { Participant }                from './participant';
import { Measurement }                from './measurement';
import { DBService }         from './db.service';

@Component({
  selector: 'my-add',
  templateUrl: './add.component.html',
  styleUrls: [ './add.component.css' ]
})
export class AddComponent implements OnInit {
  weighins: Object[];
  measurement: Measurement;
  participants: Participant[];
  Date: string;
  Time: string;
  Participant: string;
  BodyFat: number;
  Weight: number;
  Viseral: number;
  Waist: number;
  Tool: string;
  Buddy: string;
  yourCompoundInputObject: any;
  
  constructor(
    private dbService: DBService,
    private router: Router,
	private app: AppComponent) {
		this.getParticipants();
		var date = new Date(); 
		date.setDate(date.getDate()-(4/24)); //eastern time zone
		this.measurement= new Measurement;
		this.measurement.Date = date.toISOString().slice(0,10);
		this.measurement.Time = date.toISOString().slice(11,16);
		this.measurement.Participant = '';
		this.measurement.BodyFat = 0;//'00.0%';
		this.measurement.Weight = 0;//'00.0 lbs';
		this.measurement.Viseral = 0;//'0';
		this.measurement.Waist = 0;//'00 0/0\"';
		this.measurement.Tool = 'Klees Scale';
		this.measurement.Buddy = ''; 
		if(this.app.isAdmin!=true)
		{	
			this.measurement.Buddy = this.app.userName;
		}
		
		
	
 }

  getWeighins(): void {
	this.dbService
        .getAllWeighins()
        .then((weighins) => { 
			this.weighins = weighins; 
		})
        .catch(this.handleError);
  }

  getParticipants(): void {
	this.dbService
        .getParticipants()
        .then((participants) => { 
			this.participants = participants; 
			
			
			var date = new Date(); 
			date.setDate(date.getDate()-(4/24)); //eastern time zone
			
			this.measurement.Date = date.toISOString().slice(0,10);
			this.measurement.Time = date.toISOString().slice(11,16);
			this.yourCompoundInputObject = {
		  schema:    {
			"type": "object",
			"required": [
			  "date",
			  "time",
			  "bodyFat",
			  "weight",
			  "tool",
			  "participant",
			  "buddy"
			],
			"properties": {
			  "date": {
				"title": "Measurement date",
				"type": "string",
				"format": "date"
			  },
			  "time": {
				"title": "Measurement time",
				"type": "string",
				"format": "time"
			  },
			  "bodyFat": {
				"title": "% bodyfat",
				"default": 30.0,
				"type": "number"
			  },
			  "weight": {
				"title": "Weight (lbs))",
				"default": 100.0,
				"type": "number"
			  },
			  "viseral": {
				"title": "Viseral",
				"default": 0,
				"type": "number"
			  },
			  "Waist": {
				"title": "Waist (in))",
				"default": 0,
				"type": "number"
			  },
			  "tool": {
				"title": "Tool",
				"type": "string",
				"enum": [
				  "Klee's Scale",
				  "Iveto's Handheld"
				]
			  },
			  "participant": {
				"title": "Participant",
				"type": "string",
				"enum": []
			  },
			  "buddy": {
				"title": "Buddy",
				"type": "string",
				"enum": []
			  }
			  
			}
		},
		
  "form": [
    {
      "type": "fieldset",
      "title": "New Measurement"
    },
    {
      "key": "date",
      "minDate": "2017-04-06",
      "maxDate": "2017-10-11"
    },
    {
      "type": "actions",
      "items": [
        {
          "type": "submit",
          "style": "btn-info",
          "title": "Add Measurement"
          "onClick": "add()"
        }
      ]
    }
  ]	
	};
			for (var i = 0; i < this.participants.length; i++) 
			{
				this.yourCompoundInputObject.schema.properties.participant.enum.push(this.participants[i].Name);
				this.yourCompoundInputObject.schema.properties.buddy.enum.push(this.participants[i].Name);
			}
		})
        .catch(this.handleError);
  }
  
  add(): void {
	var newMeasurement = new Measurement();
	
	var error = 'Input Error(s): ';
	var invalidInput = false;
	
	//admins get the whole list of buddies so they can fill in for otherwise
	//non admins get their name populated in a field bound to this.measurement.Buddy
	if(this.app.isAdmin!=true) 
	{
		for(let participant of this.participants) //look up buddy from name 
		{	
			if(this.measurement.Buddy==participant.Name)
			{
				newMeasurement.Buddy=participant.Id;
			}
		}
	}
	else
	{
		if(this.measurement.Buddy)
		{
			newMeasurement.Buddy=this.measurement.Buddy;
		}
		else
		{
			error += '\n ! Must select a buddy !';
			invalidInput = true;
		}
	}
	
	if(!this.measurement.Date || !this.validateDate(this.measurement.Date) )
	{
		error += '\n ! Invalid Date !';
		invalidInput = true;
	}
	else
	{
		newMeasurement.Date = this.measurement.Date;
	}
	
	if(!this.measurement.Time || !this.validateTime(this.measurement.Time))
	{
		error += '\n ! Invalid Time !';
		invalidInput = true;
	}
	else
	{
		newMeasurement.Time = this.measurement.Time;
	}
	
	var floatString = ''+this.measurement.Weight;
	var tempWeight = this.validateFloat(floatString);
	if(!this.measurement.Weight || tempWeight<50 ) //no one can be this small
	{
		error += '\n ! Invalid Weight !';
		invalidInput = true;
	}
	else
	{
		newMeasurement.Weight = this.measurement.Weight;
	}

	var floatString = ''+this.measurement.BodyFat;
	var tempBodyFat =  this.validateFloat(floatString);
	tempBodyFat =  tempBodyFat/= 100;
	if(!this.measurement.BodyFat || tempBodyFat>.99 || tempBodyFat<.01 )
	{
		error += '\n ! Invalid BodyFat !';
		invalidInput = true;
	}
	else
	{
		newMeasurement.BodyFat = tempBodyFat;
	}
	
	
	floatString = ''+this.measurement.Waist;
	var tempFractionWaist = this.decimalWaist(floatString);
	var tempFloatWaist = this.validateFloat(floatString);
	
	if(tempFractionWaist<0)
	{
		if(tempFloatWaist<0)
		{
			error += '\n ! Invalid Waist !';
			invalidInput = true;
		}
		else
		{
			newMeasurement.Waist = tempFloatWaist;
		}
	}
	else
	{
		newMeasurement.Waist = tempFractionWaist;
	}
	
	if(!this.measurement.Participant)
	{
		error += '\n ! Must select a Participant !';
		invalidInput = true;
	}
	else
	{
		newMeasurement.Participant = this.measurement.Participant;
	}
	
	newMeasurement.Viseral = this.measurement.Viseral;
	
	newMeasurement.Tool = this.measurement.Tool;
	
	console.log('this.app.isAdmin='+this.app.isAdmin);
	console.log('measurement.Date='+this.measurement.Date);
	console.log('measurement.Time='+this.measurement.Time);
	console.log('measurement.Participant='+this.measurement.Participant);
	console.log('measurement.Buddy='+this.measurement.Buddy);
	console.log('measurement.Weight='+this.measurement.Weight);
	console.log('measurement.Waist='+this.measurement.Waist);
	console.log('measurement.Viseral='+this.measurement.Viseral);
	console.log('measurement.Tool='+this.measurement.Tool);
	console.log('measurement.BodyFat='+this.measurement.BodyFat);
	
	console.log('newMeasurement.Date='+newMeasurement.Date);
	console.log('newMeasurement.Time='+newMeasurement.Time);
	console.log('newMeasurement.Participant='+newMeasurement.Participant);
	console.log('newMeasurement.Buddy='+newMeasurement.Buddy);
	console.log('newMeasurement.Weight='+newMeasurement.Weight);
	console.log('newMeasurement.Waist='+newMeasurement.Waist);
	console.log('newMeasurement.Viseral='+newMeasurement.Viseral);
	console.log('newMeasurement.Tool='+newMeasurement.Tool);
	console.log('newMeasurement.BodyFat='+newMeasurement.BodyFat);
	
	if(invalidInput)
	{
			alert(error);
	}
    else
	{
		//Post weight
		this.dbService.addNewWeighin
		this.dbService
        .addNewWeighin(newMeasurement)
        .then((response) => { 
			console.log(response);
		})
        .catch(this.handleError);
		this.router.navigate(['/leaderboard']);
	}
  }
  
  ngOnInit(): void {
    this.getWeighins();
  }
  
  validateDate(inputText: string): boolean {  
	var output = false;
	var ListofDays = [31,29,31,30,31,30,31,31,30,31,30,31];  
	var lpdate;  
	var pdate;  
	var yyyy; 
	var mm;
	var dd; 	
	
	inputText = inputText.trim();
	
	if(inputText.length==10)  
	{  
		pdate = inputText.split('-');  
		lpdate = pdate.length;  
		  
		  // Extract the string into year, month and day 
		  
		if (lpdate==3 && pdate[0].length==4 && pdate[1].length==2 && pdate[2].length==2)  
		{  
			yyyy = parseInt(pdate[0]);  
			mm  = parseInt(pdate[1]);  
			dd = parseInt(pdate[2]);  
	
			if(yyyy>=2017 && (mm>0 && mm<13) && (dd>0 && dd<32)) //if current date, valid month/day
			{
				var maxDaysPerMonth = ListofDays[mm-1];
				if (dd<=maxDaysPerMonth) //if valid month based on day
				{
					if(mm==2 && dd==29) //if feb 29
					{
						if(!(yyyy % 4) && (yyyy % 100) || !(yyyy % 400)) //  make sure its a leap year
						{
							output= true;
						}
					}
					else //otherwise we already decided it's valid
					{
						output= true;
					}
				}
			}
		}  
	}  
	return output;
  }  
  
   validateTime(inputText: string): boolean {  
	var output = false;
	var lpdate;  
	var pdate;  
	var hh; 
	var mm; 	
	
	inputText=inputText.trim();
	if(inputText.length==5)  
	{  
		pdate = inputText.split(':');  
		lpdate = pdate.length;  
		  
		// Extract the string into hours and minutes
		  
		if (lpdate==2 && pdate[0].length==2 && pdate[1].length==2)  
		{  
			hh = parseInt(pdate[0]);  
			mm  = parseInt(pdate[1]);  
	
			if((hh>=0 && hh<=23) && (mm>=0 && mm<=59)) //if time threshold is valid
			{
				output= true;
			}
		}  
	}  
	return output;
  }  
  
  decimalWaist(inputText: string): number {  
	var output = 0;
	var lpweight;  
	var pweight; 
	var wholeWeight; 
	var fractionBottom; 
	var fractionTop;   	
	
	inputText=inputText.trim();
	
	if(inputText.length<=8) //00 00/00 
	{  
		pweight = inputText.split(' ');  
		lpweight = pweight.length;

		if(lpweight==1)
		{
			output = parseInt(pweight[0]); 
		}
		else if (lpweight==2 && pweight[0].length==2 && pweight[1].length>2)  
		{  
			wholeWeight = parseInt(pweight[0]);  
			pweight = pweight[1].split('/');  
			lpweight = pweight.length;
	
			if(lpweight==2) 
			{
				fractionTop = parseInt(pweight[0]);
				fractionBottom = parseInt(pweight[1]);
				output = wholeWeight + (fractionTop / fractionBottom);
			}
		}  
	}  
				
	return output;
  }  
  
  validateFloat(inputText: string): number {  
	var output = -1;
	var lpdate;  
	var pdate;  
	var weight; 
	
	inputText=inputText.trim();
	if(inputText.length>0 && inputText.length<=5)  
	{  
		var tempFloat = parseFloat(inputText);
	
		if (tempFloat && tempFloat>=0) //waist can be zero
		{  
			output= tempFloat;
		}  
	}  
	return output;
  }  

  onSelect(weighin: Weighin): void {
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    return Promise.reject(error.message || error);
  }
}

