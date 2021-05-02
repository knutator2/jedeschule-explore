import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {NgxEchartsModule} from 'ngx-echarts';

import * as echarts from 'echarts';

import localeDe from '@angular/common/locales/de';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgSelectModule} from '@ng-select/ng-select';
import { FilterComponent } from './components/filter/filter.component';
import {FormsModule} from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';
import { StratifyComponent } from './components/stratify/stratify.component';
import { EchartsDataZoomDirective } from './directives/echarts-data-zoom.directive';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {AlertModule} from 'ngx-bootstrap/alert';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {AgGridAngular, AgGridModule} from 'ag-grid-angular';
import { WidgetCityComponent } from './components/widget-city/widget-city.component';
import { WidgetSchoolTypeComponent } from './components/widget-school-type/widget-school-type.component';
import { WidgetLegalStatusComponent } from './components/widget-legal-status/widget-legal-status.component';
import { WidgetProviderComponent } from './components/widget-provider/widget-provider.component';
import { WidgetZipComponent } from './components/widget-zip/widget-zip.component';
import { WidgetLinelistComponent } from './components/widget-linelist/widget-linelist.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { WidgetMapComponent } from './components/widget-map/widget-map.component';
registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FilterComponent,
    NavComponent,
    StratifyComponent,
    EchartsDataZoomDirective,
    WidgetCityComponent,
    WidgetSchoolTypeComponent,
    WidgetLegalStatusComponent,
    WidgetProviderComponent,
    WidgetZipComponent,
    WidgetLinelistComponent,
    LoadingSpinnerComponent,
    WidgetMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({echarts}),
    // NgxEchartsModule.forRoot({
    //   echarts: () => import('echarts')
    // }),
    NgSelectModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
