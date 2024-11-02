import { CommonModule,  NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FlightModel } from '../../models/fligt.model';
import { PageModel } from '../../models/page.model';
import { SafePipe } from '../safe.pipe';
import { RouterLink } from '@angular/router';
import { WebService } from '../web.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgIf, 
    HttpClientModule, 
    NgFor, 
    CommonModule, 
    SafePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public webService: WebService
  public flights : PageModel<FlightModel> | undefined = undefined

  constructor(){
    this.webService = new WebService()
  }
  ngOnInit(): void {
    this.webService.getRecommendedFlights().subscribe(res=>this.flights=res)
  }

  public getDestinationImage(dest: string){
    return 'https://img.pequla.com/destination/' + dest.split(" ")[0].toLowerCase() + '.jpg'
  }

  public getMapUrl() : string{
    return `https://www.google.com/maps?output=embed&q=${this.flights?.content[0].destination}`
  }
}
