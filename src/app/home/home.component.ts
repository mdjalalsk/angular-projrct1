import { Component, OnInit } from '@angular/core';
import { RoomServiceService } from '../room-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  rooms:any;

  constructor(private showroom:RoomServiceService) { 
    this.showroom.getRoom().subscribe(room=>this.rooms = room)
  }

  ngOnInit(): void {
  }

}
