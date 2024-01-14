import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chatui',
  templateUrl: './chatui.component.html',
  styleUrls: ['./chatui.component.css'],
})
export class ChatuiComponent implements OnInit {
  imageData: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.imageData = this.dataService.getImageData();
  }
}
