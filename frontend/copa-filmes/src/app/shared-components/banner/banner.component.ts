import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  constructor() { }

  @Input('title') title: string;
  @Input('subtitle') subtitle: string;

  ngOnInit() {
  }

}
