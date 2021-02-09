import {Directive, EventEmitter, HostListener, NgZone, Output} from '@angular/core';
import {NgxEchartsDirective} from 'ngx-echarts';

import * as _ from 'lodash';

@Directive({
  selector: '[appEchartsDataZoom]'
})
export class EchartsDataZoomDirective {

  @Output() onDataZoom: EventEmitter<any> = new EventEmitter<any>();
  private readonly onDataZoomEmit = _.debounce(e => this.onDataZoom.emit(e), 100);

  constructor(private _ngxEcharts: NgxEchartsDirective, private _zone: NgZone) { }

  @HostListener('chartDataZoom', ['$event'])
  onEchartDataZoom(event: any): void {
    console.log(event);
    const chart = (this._ngxEcharts as any).chart;
    const dataZoomId = event.batch ? event.batch[0].dataZoomId : event.dataZoomId;

    const dataZoomView = _.find(chart._componentsViews, x => x.dataZoomModel && x.dataZoomModel.id === dataZoomId);
    console.log(dataZoomView);
    if (dataZoomView) {
      const myEvent = {
        start: dataZoomView.dataZoomModel.option.start,
        end: dataZoomView.dataZoomModel.option.end,

        startValue: dataZoomView.dataZoomModel.option.startValue,
        endValue: dataZoomView.dataZoomModel.option.endValue
      };
      this.onDataZoomEmit(myEvent);
    }
  }

}
