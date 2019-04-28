import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  currentTime: any;
  maxDate: Date;

  constructor() {}

  ngOnInit() {
    this.currentTime = moment().format('LLLL');

    /* Using JavaScript dates */
    // this.maxDate = new Date();
    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    // console.log('this.maxDate', this.maxDate);

    /* Using moment.js */
    this.maxDate = moment()
      .subtract(18, 'years')
      .toDate(); // Returns a JavaScript date.
    console.log('this.maxDate', this.maxDate);
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
