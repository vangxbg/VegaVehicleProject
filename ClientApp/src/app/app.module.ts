import { AppComponent } from './app.component';
import { VehicleService } from './services/vehicle.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './shared/pagination.component';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { TestComponent } from './test/test.component';
import { HttpModule } from '@angular/http';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    ViewVehicleComponent, 
    TestComponent,
    VehicleListComponent,
    PaginationComponent
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/edit/:id', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: ViewVehicleComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path : 'test', component: TestComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [
    // { provide: ErrorHandler, useClass: AppErrorHandler },
    VehicleService,
    HttpClient,
    HttpClientModule,
    FormsModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }