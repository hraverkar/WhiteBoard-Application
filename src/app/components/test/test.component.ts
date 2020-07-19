import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(public datePipe: DatePipe) {}
  dateStamp;
  ngOnInit(): void {
    const data = Date.now();
    this.dateStamp = this.datePipe.transform(data, 'dd-MM-yyy h:mm:ss');
    console.log(this.dateStamp );
  }
}
