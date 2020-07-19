import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public credit: string;
  public language: string;
  constructor() {}

  ngOnInit(): void {
    this.credit = ' Design By : Harshl with ';
    this.language = 'Angular';
  }

  onNavigate() {
    const url = 'https://hraverkar.netlify.app';
    window.open(url, '_blank');
  }

}
