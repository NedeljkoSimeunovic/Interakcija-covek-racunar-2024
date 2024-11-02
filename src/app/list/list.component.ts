import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WebService } from '../web.service';
import { FlightModel } from '../../models/fligt.model';
import { PageModel } from '../../models/page.model';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink,NgIf, HttpClientModule, RouterLink, NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  public webService: WebService
  public data: PageModel<FlightModel> | null = null

  constructor(){
    this.webService = WebService.getInstance()
    this.getFlightDate()
  }

  public getFlightDate(page = 0){
    this.webService.getFlights(page).subscribe(rsp => this.data = rsp)
  }

  public first(){
    this.getFlightDate()
  }

  public previous(){
    if(this.data == undefined) return
    if(this.data?.first) return
    this.getFlightDate(this.data?.number - 1)
  }

  public next(){
    if(this.data == undefined) return
    if(this.data?.last) return
    this.getFlightDate(this.data?.number + 1)
  }

  public last(){
    if(this.data == undefined) return
    if(this.data?.last) return
    this.getFlightDate(this.data?.totalPages - 1)
  }
}
