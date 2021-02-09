import {Component, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DataService} from '../../services/data.service';
import {WidgetBarComponent} from '../widget-bar.component';

@Component({
  selector: 'app-widget-legal-status',
  templateUrl: './widget-legal-status.component.html',
  styleUrls: ['./widget-legal-status.component.scss']
})
export class WidgetLegalStatusComponent extends WidgetBarComponent implements OnInit, OnChanges {

  constructor(protected dataService: DataService, private zone: NgZone) {
    super(dataService);
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    const series = this.createSeries();
    console.log('legal status series', series);
    this.chartOption = {
      ...this.chartOption,
      title: {
        ...this.chartOption.title,
        text: 'Legal Status',
      },
      series };
  }

  onChartInit(chart: any): void {
    this.registerAxisPointerClick(chart, (xCategory) => {
      this.zone.run(() => {
        console.log('category', xCategory);
        const filterUpdate = this.filter.toggleLegalStatusFilterValue(xCategory);
        this.onFilterChanged.emit(filterUpdate);
      });
    });
  }

  protected getCategoryPredicate(): any {
    return this.filter.getLegalStatusPredicate();
  }

}
