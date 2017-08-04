import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { Router }            from '@angular/router';
import { MaterialModule } from '@angular/material';
import { MdSnackBar} from '@angular/material';
import { DeltaMeasurement }                from './deltameasurement';

import { Weighin }                from './weighin';
import { Measurement }                from './measurement';
import { DBService }         from './db.service';
declare let d3: any;

@Component({
  selector: 'my-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: [ './leaderboard.component.css' ]
})
export class LeaderboardComponent implements OnInit {
  one_second = 1000;
  one_minute = 60*this.one_second;
  one_hour = 60*this.one_minute; 
  one_day= 24*this.one_hour;
  one_week= 7*this.one_day;
  one_month= 30*this.one_day;
  one_year= 365*this.one_day;
  timeLeftDescription = "";
  cashLeftDescription = "";
  reportedDescription = "";
  totalCash = 3125;
  totalParticipants = 25;
  
  deltaWeighins: DeltaMeasurement[];
  weighins: Weighin[];
  api: any;
  baseOptions: any;
  bodyFatLostOptions: any;
  bodyFatOptions: any;
  weightLostOptions: any;
  weightOptions: any;
  waistLostOptions: any;
  waistOptions: any;
  viseralLostOptions: any;
  viseralOptions: any;
  data: any;
  leaderList: any;
  payoutDonutOptions: any;
  payoutDonutData: any;
  rankingDonutOptions: any;
  rankingDonutData: any;
  daysLeftOptions: any;
  daysLeftData: any;
  reportedOptions: any;
  reportedData: any;
  currentDate= Date.now();
  
  public maxDayIndex: number;
  public maxScale: number;
  public minScale: number;

  constructor(
    private dbService: DBService,
    private router: Router,
	private _snackbar: MdSnackBar) {
		this.maxDayIndex=60;
		this.maxScale = 20;
		this.minScale = -20;

 }
 
  onSelect(event: any) {
    console.log(event);
  }


  getWeighins(): void {
	this.dbService
        .getWeighinChartData()
        .then((weighins) => { 
			this.data = weighins;
			this.calculateLeaderList();
		})
        .catch(this.handleError);
  }

  calculateLeaderList() {
	var reportedIn = 0 ;
	this.deltaWeighins = [];
	
	for (var i = 0; i < this.data.length; i++) 
	{
		if(!this.data[i].key.includes("TOTAL") && !this.data[i].key.includes("AVERAGE") )
		{
			reportedIn++;
			var measurement = new DeltaMeasurement();
			measurement.Participant = this.data[i].key;
			for(var j = 0; j < this.data[i].values.length; j++)
			{
				
				if(this.data[i].values[j].FillInData=="false")
				{
					measurement.IsStartWeight = 0;
					measurement.Date= this.data[i].values[j].Date;
					measurement.Time= this.data[i].values[j].Time;
					measurement.DeltaBodyFat= this.data[i].values[j].DeltaBodyFat;
					measurement.DeltaWeight= this.data[i].values[j].DeltaWeight;
					measurement.DeltaViseral= this.data[i].values[j].DeltaViseral;
					measurement.DeltaWaist= this.data[i].values[j].DeltaWaist;
					measurement.Tool= this.data[i].values[j].Tool;
					measurement.CurrentBodyFat= this.data[i].values[j].BodyFat;
					measurement.CurrentWeight= this.data[i].values[j].Weight;
					measurement.CurrentViseral= this.data[i].values[j].Viseral;
					measurement.CurrentWaist= this.data[i].values[j].Waist; 	
				}
			}	
						
			measurement.DateDeltaDescription = "updated "+this.approximateDateDifference(this.currentDate,new Date(measurement.Date+"T"+measurement.Time).getTime())+" ago";
			console.log(measurement.Date+" "+measurement.DateDeltaDescription);
			this.deltaWeighins[i] = measurement;
		}
		
		
	}
	
	//sort based on bodyfat delta to rank by best, to worst, and then no new measurement guys
	this.deltaWeighins.sort(function(a: DeltaMeasurement, b: DeltaMeasurement){
		var output = b.DeltaBodyFat-a.DeltaBodyFat;
		if(b.DeltaBodyFat == 0)
		{
			output = -10000-a.DeltaBodyFat; //move the 0's to the end
		}
		else 
		{
			if(a.DeltaBodyFat == 0)
			{
				output = b.DeltaBodyFat-(10000*-1);  //move the 0's to the end
			}
		}
		
		return output;
	});
	
	for(var j = 0; j < this.deltaWeighins.length && j < 5; j++)
	{
		this.deltaWeighins[j].Participant = (j+1)+". "+this.deltaWeighins[j].Participant;
	}
	
	for(var j = 5; j < this.deltaWeighins.length; j++)
	{
		this.deltaWeighins[j].Participant = "\u00A0\u00A0\u00A0\u00A0"+this.deltaWeighins[j].Participant;
	}
		
	this.reportedData = [
		{
			x: "Reported",
			y: reportedIn
		},
		{
			x: "Not Reported",
			y: (this.totalParticipants-reportedIn)
		}
	];		
	
	this.reportedDescription = this.totalParticipants+" Participants in total";
	this.reportedOptions.duration = 200;
	
	var startDate= new Date("2017-04-11").getTime();
	var endDate= new Date("2017-10-10").getTime();
	
	var currentDifference_ms = 0;
	var totalDifference_ms = 0;
	
	var currentDifference_ms = endDate - this.currentDate;
	var totalDifference_ms = endDate - startDate;
	
	// Convert back to days and return
	var daysLeft = Math.round(currentDifference_ms/this.one_day); 
	var totalDays = Math.round(totalDifference_ms/this.one_day); 
	this.timeLeftDescription = "Approximately "+this.approximateDateDifference(endDate,this.currentDate)+ " remaining";
	this.cashLeftDescription = "Total Pot Value:$"+this.totalCash;
	this.reportedDescription = this.totalParticipants+" Participants in total";
	
	this.daysLeftData = [
		{
			x: "Days Elapsed",
			y: (totalDays-daysLeft)
		},
		{
			x: "Days Left",
			y: daysLeft
		}
	];
	
	this.payoutDonutData = [
			{
                x: "1st",
                y: .65*this.totalCash
            },
            {
                x: "2nd",
                y: .15*this.totalCash
            },
            {
                x: "3rd",
                y: .1*this.totalCash
            },
            {
                x: "4th",
                y: .05*this.totalCash
            },
            {
                x: "5th",
                y: .05*this.totalCash
            },
            {
                x: "Losers",
                y: 0
            }
	];
  }
  
  showSnackbar() {
    this._snackbar.open('YUM SNACKS', 'CHEW');
  }

  ngOnInit(): void {
	console.log("ngOnInit");
	
	
	
	this.reportedData = [];
	
	this.daysLeftData = [];
	
	this.payoutDonutData = [];
		
	this.daysLeftOptions = {
		"chart": {
		"type": "pieChart",
		"height": 225,
		"donut": true,
		"showLabels": true,
		"pie": {},
		"showLegend": false,
		"duration": 200,
		"labelsOutside":true,
		"labelSunbeamLayout":true,
		"valueFormat":function (n: any){return n+" Days";},
		"donutRatio":.3,
		"noData":"Loading Data...",
		"legend": {
		  "margin": {
			"top": 5,
			"right": 0,
			"bottom": 5,
			"left": 0
		  }
		}
	  }
	};
	
	this.reportedOptions = {
		"chart": {
		"type": "pieChart",
		"height": 225,
		"donut": true,
		"showLabels": true,
		"pie": {},
		"showLegend": false,
		"duration": 200,
		"labelsOutside":true,
		"labelSunbeamLayout":true,
		"valueFormat":function (n: any){return n+" People";},
		"donutRatio":.3,
		"noData":"",
		"legend": {
		  "margin": {
			"top": 5,
			"right": 0,
			"bottom": 5,
			"left": 0
		  }
		}
	  }
	};

	this.payoutDonutOptions = {
		"chart": {
		"type": "pieChart",
		"height": 225,
		"donut": true,
		"showLabels": true,
		"pie": {},
		"duration": 200,
		"labelsOutside":true,
		"labelSunbeamLayout":true,
		"valueFormat":function (n: any){return (n/3125)*100+"% = $"+n;},
		"donutRatio":.3,
		"noData":"",
		"legend": {
		  "margin": {
			"top": 5,
			"right": 0,
			"bottom": 5,
			"left": 0
		  }
		}
	  }
	};
	
	
	
	this.baseOptions = {
            "chart": {
				// "type": "lineChart",
				"type": "lineWithFocusChart",
				"height": 450,
				"title": {
					"enable": true,
					"text": "Body Fat Progress",
					"className": "h4"
				},
				"margin": {
				  "top": 20,
				  "right": 20,
				  "bottom": 40,
				  "left": 55
				},
				"useInteractiveGuideline": true,
				"dispatch": {},
				"xAxis": {
				  "axisLabel": "Time since 4/11/17 (Days)",
				  "dispatch": {},
				  "axisLabelDistance": 0,
				  "staggerLabels": false,
				  "rotateLabels": 0,
				  "rotateYLabel": true,
				  "showMaxMin": true,
				  "height": 60,
				  "ticks": null,
				  "width": 75,
				  "margin": {
					"top": 0,
					"right": 0,
					"bottom": 0,
					"left": 0
				  },
				  "duration": 250,
				  "orient": "bottom",
				  "tickValues": null,
				  "tickSubdivide": 0,
				  "tickSize": 6,
				  "tickPadding": 7,
				  "domain": [
					0,
					1
				  ],
				  "range": [
					0,
					1
				  ]
				},
				"yAxis": {
				  "axisLabelDistance": -10,
				  "dispatch": {},
				  "staggerLabels": false,
				  "rotateLabels": 0,
				  "rotateYLabel": true,
				  "showMaxMin": true,
				  "height": 60,
				  "ticks": null,
				  "width": 75,
				  "margin": {
					"top": 0,
					"right": 0,
					"bottom": 0,
					"left": 0
				  },
				  "duration": 250,
				  "orient": "left",
				  "tickValues": null,
				  "tickSubdivide": 0,
				  "tickSize": 6,
				  "tickPadding": 3,
				  "domain": [
					0,
					1
				  ],
				  "range": [
					0,
					1
				  ]
				},
				"lines": {
				  "dispatch": {},
				  "width": 960,
				  "height": 500,
				  "pointDomain": [
					16,
					256
				  ],
				  "xRange": null,
				  "yRange": null,
				  "pointRange": null,
				  "forceX": [],
				  "forceY": [],
				  "forcePoint": [],
				  "interactive": true,
				  "padDataOuter": 0.1,
				  "padData": false,
				  "clipEdge": true,
				  "clipVoronoi": true,
				  "showVoronoi": false,
				  "id": 66202,
				  "interactiveUpdateDelay": 300,
				  "showLabels": false,
				  "margin": {
					"top": 0,
					"right": 0,
					"bottom": 0,
					"left": 0
				  },
				  "duration": 0,
				  "useVoronoi": true,
				  "interpolate": "linear"
				},
				"lines2": {
				  "dispatch": {},
				  "width": 960,
				  "height": 500,
				  "xDomain": null,
				  "yDomain": null,
				  "pointDomain": [
					16,
					256
				  ],
				  "xRange": null,
				  "yRange": null,
				  "pointRange": null,
				  "forceX": [],
				  "forceY": [],
				  "forcePoint": [],
				  "interactive": false,
				  "padDataOuter": 0.1,
				  "padData": false,
				  "clipEdge": false,
				  "clipVoronoi": true,
				  "showVoronoi": false,
				  "id": 35156,
				  "interactiveUpdateDelay": 300,
				  "showLabels": false,
				  "margin": {
					"top": 0,
					"right": 0,
					"bottom": 0,
					"left": 0
				  },
				  "duration": 250,
				  "useVoronoi": true,
				  "interpolate": "linear"
				},
				"interactiveLayer": {
				  "dispatch": {},
				  "tooltip": {
					"duration": 0,
					"gravity": "w",
					"distance": 25,
					"snapDistance": 0,
					"classes": null,
					"chartContainer": null,
					"enabled": true,
					"hideDelay": 0,
					"headerEnabled": true,
					"fixedTop": null,
					"hidden": false,
					"data": null,
					"id": "nvtooltip-96942"
				  },
				  "margin": {
					"left": 55,
					"top": 30
				  },
				  "width": null,
				  "height": null,
				  "showGuideLine": true,
				  "svgContainer": null
				}
			  }
    };
	
	this.bodyFatLostOptions = JSON.parse(JSON.stringify(this.baseOptions));
	this.bodyFatLostOptions.chart.yAxis.axisLabel="BodyFat % Lost (%)";
	this.bodyFatLostOptions.chart.x = function (d: any){ return (d.DayCount); };
	this.bodyFatLostOptions.chart.y = function (d: any) { return Math.round(d.DeltaBodyFat*10)/10; };
	this.bodyFatLostOptions.chart.interactiveLayer.tooltip.valueFormatter  = function (d: any, i: any) { return d+"%"; };
	this.bodyFatLostOptions.chart.interactiveLayer.tooltip.headerFormatter  = function (d: any, i: any) 
	{ 
		var myDate = new Date(2017,4,11); 
		myDate= new Date(myDate.getTime()+((d) * 60 * 60 * 24 *1000)); 
		return "Day "+d+" - "+myDate.toString().slice(0,15);
	};
	this.bodyFatLostOptions.chart.interactiveLayer.tooltip.keyFormatter  = function (d: any, i: any) { return d+""; };

	
	this.bodyFatOptions = JSON.parse(JSON.stringify(this.baseOptions));
	this.bodyFatOptions.chart.yAxis.axisLabel="Current BodyFat (%)";
	this.bodyFatOptions.chart.x = function (d: any) { return d.DayCount; };
	this.bodyFatOptions.chart.y = function (d: any) { return Math.round(d.BodyFat*1000)/10; };
	this.bodyFatOptions.chart.interactiveLayer.tooltip.valueFormatter  = function (d: any, i: any) { return d+"%"; };
	this.bodyFatOptions.chart.interactiveLayer.tooltip.headerFormatter  = function (d: any, i: any)
	{ 
		var myDate = new Date(2017,4,11);
		myDate= new Date(myDate.getTime()+((d) * 60 * 60 * 24 *1000)); 
		return "Day "+d+" - "+myDate.toString().slice(0,15);
	};
	this.bodyFatOptions.chart.interactiveLayer.tooltip.keyFormatter  = function (d: any, i: any) { return d+""; };
				  // "axisLabel": "Weight Lost (lbs)",
	this.weightLostOptions = JSON.parse(JSON.stringify(this.baseOptions));
	this.weightLostOptions.chart.yAxis.axisLabel="Weight Lost (lbs)";
	this.weightLostOptions.chart.x = function (d: any) { return d.DayCount; };
	this.weightLostOptions.chart.y = function (d: any) { return (Math.round(d.DeltaWeight*10))/10; };
	this.weightLostOptions.chart.interactiveLayer.tooltip.valueFormatter  = function (d: any, i: any) { return d+" lbs"; };
	this.weightLostOptions.chart.interactiveLayer.tooltip.headerFormatter  = function (d: any, i: any)
	{ 
		var myDate = new Date(2017,4,11);
		myDate= new Date(myDate.getTime()+((d) * 60 * 60 * 24 *1000)); 
		return "Day "+d+" - "+myDate.toString().slice(0,15);
	};
	this.weightLostOptions.chart.interactiveLayer.tooltip.keyFormatter  = function (d: any, i: any) { return d+""; };
	
	this.weightOptions = JSON.parse(JSON.stringify(this.baseOptions));
	this.weightOptions.chart.yAxis.axisLabel="Current Weight(lbs)";
	this.weightOptions.chart.x = function (d: any) { return d.DayCount; };
	this.weightOptions.chart.y = function (d: any) { return d.Weight; };
	this.weightOptions.chart.interactiveLayer.tooltip.valueFormatter  = function (d: any, i: any) { return d+" lbs"; };
	this.weightOptions.chart.interactiveLayer.tooltip.headerFormatter  = function (d: any, i: any)
	{ 
		var myDate = new Date(2017,4,11);
		myDate= new Date(myDate.getTime()+((d) * 60 * 60 * 24 *1000)); 
		return "Day "+d+" - "+myDate.toString().slice(0,15);
	};
	this.weightOptions.chart.interactiveLayer.tooltip.keyFormatter  = function (d: any, i: any) { return d+""; };
	
	this.waistOptions = JSON.parse(JSON.stringify(this.baseOptions));
	this.waistOptions.chart.yAxis.axisLabel="Waist Size (in)";
	this.waistOptions.chart.x = function (d: any) { return d.DayCount; };
	this.waistOptions.chart.y = function (d: any) { return d.Waist; };
	this.waistOptions.chart.interactiveLayer.tooltip.valueFormatter  = function (d: any, i: any) { return d+" in"; };
	this.waistOptions.chart.interactiveLayer.tooltip.headerFormatter  = function (d: any, i: any)
	{ 
		var myDate = new Date(2017,4,11);
		myDate= new Date(myDate.getTime()+((d) * 60 * 60 * 24 *1000)); 
		return "Day "+d+" - "+myDate.toString().slice(0,15);
	};
	this.waistOptions.chart.interactiveLayer.tooltip.keyFormatter  = function (d: any, i: any) { return d+""; };
	
	this.waistLostOptions = JSON.parse(JSON.stringify(this.baseOptions));
	this.waistLostOptions.chart.yAxis.axisLabel="Waist Inches Lost (in)";
	this.waistLostOptions.chart.x = function (d: any) { return d.DayCount; };
	this.waistLostOptions.chart.y = function (d: any) { return d.DeltaWaist; };
	this.waistLostOptions.chart.interactiveLayer.tooltip.valueFormatter  = function (d: any, i: any) { return d+" in"; };
	this.waistLostOptions.chart.interactiveLayer.tooltip.headerFormatter  = function (d: any, i: any)
	{ 
		var myDate = new Date(2017,4,11);
		myDate= new Date(myDate.getTime()+((d) * 60 * 60 * 24 *1000)); 
		return "Day "+d+" - "+myDate.toString().slice(0,15);
	};
	this.waistLostOptions.chart.interactiveLayer.tooltip.keyFormatter  = function (d: any, i: any) { return d+""; };
	
	this.viseralOptions = JSON.parse(JSON.stringify(this.baseOptions));
	this.viseralOptions.chart.yAxis.axisLabel="Current Viseral";
	this.viseralOptions.chart.x = function (d: any) { return d.DayCount; };
	this.viseralOptions.chart.y = function (d: any) { return d.Viseral; };
	this.viseralOptions.chart.interactiveLayer.tooltip.valueFormatter  = function (d: any, i: any) { return d+""; };
	this.viseralOptions.chart.interactiveLayer.tooltip.headerFormatter  = function (d: any, i: any)
	{ 
		var myDate = new Date(2017,4,11);
		myDate= new Date(myDate.getTime()+((d) * 60 * 60 * 24 *1000)); 
		return "Day "+d+" - "+myDate.toString().slice(0,15);
	};
	this.viseralOptions.chart.interactiveLayer.tooltip.keyFormatter  = function (d: any, i: any) { return d+""; };
	
	this.viseralLostOptions = JSON.parse(JSON.stringify(this.baseOptions));
	this.viseralLostOptions.chart.yAxis.axisLabel="Viseral Lost over time";
	this.viseralLostOptions.chart.x = function (d: any) { return d.DayCount; };
	this.viseralLostOptions.chart.y = function (d: any) { return d.DeltaViseral; };
	this.viseralLostOptions.chart.interactiveLayer.tooltip.valueFormatter  = function (d: any, i: any) { return d+""; };
	this.viseralLostOptions.chart.interactiveLayer.tooltip.headerFormatter  = function (d: any, i: any)
	{ 
		var myDate = new Date(2017,4,11);
		myDate= new Date(myDate.getTime()+((d) * 60 * 60 * 24 *1000)); 
		return "Day "+d+" - "+myDate.toString().slice(0,15);
	};
	this.viseralLostOptions.chart.interactiveLayer.tooltip.keyFormatter  = function (d: any, i: any) { return d+""; };
	
	this.getWeighins();   
	
  }  
  
  approximateDateDifference(latestDate: number, oldestDate: number): string {
	var output = "";
	var timeSinceLastMeasurement_ms = latestDate-oldestDate;
	var minutesSinceLastMeasurement = Math.round(timeSinceLastMeasurement_ms/this.one_minute);   
	// console.log("minutesSinceLastMeasurement="+minutesSinceLastMeasurement);
	if(minutesSinceLastMeasurement<2)
	{
		output = "a moment";
	}
	else
	{
		if(minutesSinceLastMeasurement<6)
		{
			output = "a few minutes";
		}
		else
		{
			var hoursSinceLastMeasurement = Math.round(timeSinceLastMeasurement_ms/this.one_hour); 
			// console.log("hoursSinceLastMeasurement="+hoursSinceLastMeasurement);
			
			if(hoursSinceLastMeasurement<1)
			{
				output = minutesSinceLastMeasurement+" mintues";
			}
			else
			{
				if(hoursSinceLastMeasurement<5)
				{
					output = "a few hours ";
				}
				else
				{
					var daysSinceLastMeasurement = Math.round(timeSinceLastMeasurement_ms/this.one_day); 
					// console.log("daysSinceLastMeasurement="+daysSinceLastMeasurement);
					
					if(daysSinceLastMeasurement<1)
					{
						output = hoursSinceLastMeasurement+" hours";
					}
					else
					{	
						var weeksSinceLastMeasurement = Math.round(timeSinceLastMeasurement_ms/this.one_week); 
						// console.log("weeksSinceLastMeasurement="+weeksSinceLastMeasurement);
	
						if(weeksSinceLastMeasurement<1)
						{
							if(daysSinceLastMeasurement==1)
							{
								output = "a day";
							}
							else
							{
								output = daysSinceLastMeasurement+" days";
							}
						}
						else
						{	
							var monthsSinceLastMeasurement = Math.round(timeSinceLastMeasurement_ms/this.one_month);
							// console.log("monthsSinceLastMeasurement="+monthsSinceLastMeasurement);
							
							if(monthsSinceLastMeasurement<1)
							{
								if(weeksSinceLastMeasurement==1)
								{
									output = "a week ";
								}
								else
								{
									output = weeksSinceLastMeasurement+" weeks";
								}
							}
							else
							{
								var yearsSinceLastMeasurement = Math.round(timeSinceLastMeasurement_ms/this.one_year);  
								// console.log("yearsSinceLastMeasurement="+yearsSinceLastMeasurement);
	
								if(yearsSinceLastMeasurement<1)
								{
									if(monthsSinceLastMeasurement==1)
									{
										// output = "Measured a month ago";
										output = "a month";
									}
									else
									{
										output = monthsSinceLastMeasurement+" months";
									}
								}
								else
								{
									if(yearsSinceLastMeasurement==1)
									{
										output = "a year";
									}
									else
									{
										output = yearsSinceLastMeasurement+" years";
									}
								}	
							}											
						}
					}
				}
			}
		}
	}
	return output;
  }
   
  add(): void {
    this.router.navigate(['/add']);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

