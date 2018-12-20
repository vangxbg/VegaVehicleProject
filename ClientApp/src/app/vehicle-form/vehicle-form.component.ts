import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/Observable/forkJoin';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { SaveVehicle, Vehicle } from '../Models/vehicle';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[]; 
  models: any[];
  features: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      email: '',
      phone: '',
    }
  };

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router ) { 
      route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      });
    }

  ngOnInit() {

    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if(this.vehicle.id){
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));
    }else{
      this.vehicle.id = 0;
    }

    const observable = forkJoin(
      sources
    );

    observable.subscribe(data => {
        this.makes = data[0];
        this.features = data[1];
        if(this.vehicle.id)
          this.setVehicle(data[2]);
          this.populateModels();
      }, err => {
          if (err.status == 404)
            this.router.navigate(['/']);
      });

  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');
  } 

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if(!this.vehicle.id){
      console.log(this.vehicle.id);
      this.vehicleService.create(this.vehicle)
      .subscribe(x => console.log(x));
    }else{
      console.log("updating");
      this.vehicleService.update(this.vehicle)
      .subscribe(x => console.log(x));
    }

  }

  delete() {
    if (confirm("Are you sure?")){
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => {
          this.router.navigate(['/']);
        });
    }
  }

}