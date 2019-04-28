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

  constructor() {}

  ngOnInit() {
    // this.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    // this.currentTime = moment();
    this.currentTime = moment().format('LLLL');
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }
}
