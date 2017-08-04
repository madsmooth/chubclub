import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { MaterialModule } from '@angular/material';
import { MdSnackBar} from '@angular/material';

import { Weighin }                from './weighin';
import { DBService }         from './db.service';

@Component({
  selector: 'my-faq',
  templateUrl: './faq.component.html',
  styleUrls: [ './faq.component.css' ]
})
export class FAQComponent implements OnInit {
  weighins: Object[];
  	  
  constructor(
    private dbService: DBService,
    private router: Router,
	private _snackbar: MdSnackBar) {
 }
  
  showSnackbar() {
    this._snackbar.open('YUM SNACKS', 'CHEW');
  }    

  ngOnInit(): void {

  }

    
  add(): void {
    this.router.navigate(['/add']);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

