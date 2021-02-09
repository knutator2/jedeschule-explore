import {Component, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataService} from '../../services/data.service';
import {WidgetBarComponent} from '../widget-bar.component';

@Component({
  selector: 'app-widget-city',
  templateUrl: './widget-city.component.html',
  styleUrls: ['./widget-city.component.scss']
})
export class WidgetCityComponent extends WidgetBarComponent implements OnInit, OnChanges {

  constructor(protected dataService: DataService, private zone: NgZone) {
    super(dataService);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    const series = this.createSeries();
    this.chartOption = {
      ...this.chartOption,
      title: {
        ...this.chartOption.title,
        text: 'Stadt',
      },
      dataZoom: [
        {
          id: 'dataZoomX',
          type: 'slider',
          xAxisIndex: [0],
          start: 0,
          end: 1,
          filterMode: 'filter'
        }
      ],
      series };
  }

  onChartInit(chart: any): void {
    this.registerAxisPointerClick(chart, (xCategory) => {
      this.zone.run(() => {
        const filterUpdate = this.filter.toggleCityFilterValue(xCategory);
        this.onFilterChanged.emit(filterUpdate);
      });
    });
  }

  protected getCategoryPredicate(): any {
    return this.filter.getCityPredicate();
  }

}
