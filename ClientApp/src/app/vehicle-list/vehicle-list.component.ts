import { Component, OnInit } from '@angular/core';
import { Vehicle, KeyValuePair } from '../Models/vehicle';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html'
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];
  // allVehicles: Vehicle[]; // this is only for client side filtering
  makes: KeyValuePair[];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() { 

    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
  }

  populateVehicles() {
    this.vehicleService.getVehicles(this.filter)
      // .subscribe(vehicles => this.vehicles = this.allVehicles = vehicles);  // this is only for client side filtering
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  onFilterChange(){
    // this is only for client side filtering
    // var vehicles = this.allVehicles;

    // if(this.filter.makeId)
    //   vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);

    // if(this.filter.modelId)
    //   vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);

    // this.vehicles = vehicles;
    this.populateVehicles();
  }

  resetFilter(){
    this.filter = {};
    this.onFilterChange();
  }
}