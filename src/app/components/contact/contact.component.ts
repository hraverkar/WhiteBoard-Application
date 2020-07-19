import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
  saveInfo(form: NgForm) {
    const name = form.value.name;
    const email = form.value.emailadd;
    const company = form.value.company;
    const message = form.value.message;

    this.dataService
      .saveInformations(name, email, company, message)
      .then((msg) => {
        console.log(msg);
        form.reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
