import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {DataFilter} from '../model/data-filter';
import {DataService} from '../services/data.service';
import {DecimalPipe} from '@angular/common';
import {Util} from '../util/util';

import * as _ from 'lodash';

@Component({ template: ''})
export abstract class WidgetBarComponent implements OnChanges {
    @Input() filter: DataFilter = new DataFilter();
    @Output() onFilterChanged: EventEmitter<DataFilter> = new EventEmitter<DataFilter>();
    @Input() data: any[] = [];

    title = 'untitled';

    public chartOption: any = {
        title: {
            text: '',
            left: 'center',
        },
        grid: {
            top: 60,
            left: 50,
            right: 35
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' },
            formatter: (params: any[]) => {
                const sum = _.sumBy(params, x => x.value[1]);
                const sumLabel = 'Schulen'; // this.measure === "incidence" ? "Inzidenz" : (sum > 1 ? 'Fälle' : 'Fall')
                let result = `${params[0].axisValueLabel}: ${this.formatValue(sum)} ${sumLabel}`;
                if (this.chartOption.series.length > 1) {
                    result = `${params[0].axisValueLabel}: ${this.formatValue(sum)} ${sumLabel}<br/>${params.map(x => `${x.marker} ${x.seriesName}: ${this.formatValue(x.value[1])}`).join('<br/>')}`;
                }
                return result;
            }
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'middle',
            feature: {
                saveAsImage: { title: 'Als Bild Speichern', emphasis: { iconStyle: { textPosition: 'bottom', textAlign: 'center' } }, name: this.title },
                myDownload: {
                    show: true,
                    title: 'Daten speichern',
                    icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                    onclick: () => this.downloadData(),
                    emphasis: { iconStyle: { textPosition: 'bottom', textAlign: 'center' } }
                },
            }
        },
        legend: { show: false, top: 30, type: 'scroll' },
        xAxis: {
            type: 'category',
            axisLabel: {},
        },
        yAxis: {
            type: 'value',
            splitLine: { show: true },
            minInterval: 1,
            minorTick: { splitNumber: 5 },
            splitNumber: 5,
            axisLabel: {
                formatter: value => this.numberPipe.transform(value)
            }
        },
        series: []
    };

    private numberPipe = new DecimalPipe('de');


    protected constructor(protected dataService: DataService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        //this.chartOption.series[0] = this.data;
        //this.chartOption = { ...this.chartOption };
        //console.log(this.chartOption);
        if (changes.data) {
            console.log(this.data);
            this.data = this.data.filter(x => x.value > 0);
        }

    }

    public setTitle(title: string): void {
        this.title = title;
        this.chartOption.toolbox.feature.saveAsImage.name = title;
    }

    private formatValue(value: number): string | null {
        if (isNaN(value)) { return 'Keine Einwohnerdaten'; }
        return this.numberPipe.transform(Math.round((value + Number.EPSILON) * 1000) / 1000);
    }

    protected abstract getCategoryPredicate(): (category: number) => boolean;

    protected registerAxisPointerClick(chart: any, handler: (xCategory: number) => void): void {
        const zr = chart.getZr();
        zr.on('click', (mouseEvent: any) => {
            if (this.isAxisPointer(mouseEvent.topTarget)) {
                console.log(chart);
                const xAxisView = _.find(chart._componentsViews, (x) => x.type === 'xAxis' && x.__id.includes('xAxis'));
                console.log(xAxisView);
                const gridCoordinate = chart.convertFromPixel('grid', [mouseEvent.event.zrX, mouseEvent.event.zrY]);
                if (gridCoordinate[1] >= 0) {
                    const xIndex = gridCoordinate[0];
                    const ordinals = xAxisView.__model.axis.scale.getOrdinalMeta();
                    const xCategory = ordinals.categories[xIndex];

                    //const allCategoryItems = this.getCategoryLookup().getItems();
                    //const xCategoryItem = _.find(allCategoryItems, { label: xCategory });
                    handler(xCategory);
                }
            }
        });
    }

    private isAxisPointer(target: any): boolean {
        return target && target.type === 'Rect' && target.z === 50;
    }

    protected createSeries(): any[] {
        const isInFilter = this.getCategoryPredicate();
        let seriesObjs = [];
        if (this.data.length > 0) {
            if (!_.isObject(this.data[0].value)) {
                this.chartOption.legend.show = false;
                const seriesValues = this.data.map(x => ({value: [x.key, x.value], itemStyle: {opacity: isInFilter(x.key) ? 1 : 0.4}}));
                seriesObjs = [{type: 'bar', data: seriesValues, stack: '1', name: '0'}];
            } else {
                this.chartOption.legend.show = true;
                const tmp = [];
                _.forEach(this.data[0].value, (value, key) => tmp.push({type: 'bar', data: [], stack: '1', name: key}));
                const series = tmp.reduce((prev, curr) => ({ ...prev, [curr.name]: curr }), {});
                console.log('empty series', series);
                for (let i = 0; i < this.data.length; i++) {
                    const curSeries = this.data[i];
                    _.each(curSeries.value, (value, key) => {
                        const item = {value: [curSeries.key, value], itemStyle: {opacity: isInFilter(curSeries.key) ? 1 : 0.4}};
                        series[key].data.push(item);
                    });
                }
                console.log(series);
                seriesObjs = _.values(series);
            }
        }

        return seriesObjs//_.map(seriesObjs, (x, key) => ({ ...x, key, name: this.clusterLookup.getLabel(+key) }));

        //return [{ type: 'bar', data: this.data}];
    }

    private downloadData(): void {
        console.log(this.data);
        console.log(this.chartOption);
        const result = [];
        for (const series of this.chartOption.series) {
            for (const item of series.data) {
                result.push([JSON.stringify(item.value[0]), item.value[1], series.name]);
            }
        }
        console.log(result);
        console.log(Util.convertToCSV(result));
        const dataStr = 'data:text/json;charset=utf-8,' +
            encodeURIComponent(Util.convertToCSV([['wert', 'clustertyp'], ...result]));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', `${this.title}-data.csv`);
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
}
