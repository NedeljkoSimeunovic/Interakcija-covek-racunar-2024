import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FlightModel } from '../../models/fligt.model';
import { WebService } from '../web.service';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from '../safe.pipe';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [ HttpClientModule, RouterModule, NgIf,SafePipe],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent {

  public webService: WebService
  public flight: FlightModel | null = null;

  constructor(private route: ActivatedRoute){
    this.webService = new WebService
    route.params.subscribe(params => {
      const id = params['id']
      this.webService.getFlightById(id)
      .subscribe(rsp => this.flight = rsp)
    })
  }

  public getMapUrl() : string{
    return `https://www.google.com/maps?output=embed&q=${this.flight?.destination}`
  }
}
