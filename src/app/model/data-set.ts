import {DataFilter} from './data-filter';
import * as crossfilter from 'crossfilter2/crossfilter';
import * as _ from 'lodash';
import { startOfDay, parseISO } from 'date-fns';
import {BehaviorSubject, Observable} from 'rxjs';
import {School} from './school';

export interface KeyValue {
  key: any;
  value: any;
}

export interface Stratifier<T> {
  emptyObject: { [key: string]: number };
  propertySelector: (x: T) => string;
}

export interface Dimension {
  name: string;
  dimension: any;
  group: any;
  emptyObject: any;
  selector: any;
}

export class DataSet {
  private datesetChanged = new BehaviorSubject(undefined);

  private _crossfilterDs: any;

  private dimensions: Dimension[] = [];

  private _filter: DataFilter;
  private _stratifiedBy: string;

  city: KeyValue[] = [];
  schoolType: KeyValue[] = [];
  legalStatus: KeyValue[] = [];
  provider: KeyValue[] = [];
  zip: KeyValue[] = [];
  all: School[] = [];

  public static createDefaultFilter(): DataFilter {
    const filter = new DataFilter();
    return filter;
  }

  constructor(data: School[], filter?: DataFilter) {
    this._crossfilterDs = crossfilter(data);
    // console.log(data);
    // console.log(this._crossfilterDs.all());
    const dimensionProperties: { name: string, selector: (x: School) => any }[] = [
      { name: 'city', selector: x => x.city },
      { name: 'legalStatus', selector: x => x.legal_status },
      { name: 'schoolType', selector: x => x.school_type },
      { name: 'provider', selector: x => x.provider },
      { name: 'zip', selector: x => x.zip }
    ];
    //
    for (const dimensionObj of dimensionProperties) {
      const dimension = this._crossfilterDs.dimension(dimensionObj.selector);
      //console.log(dimension.group.top(Infinity));
      const group = dimension.group();
      console.log(group);
      this.dimensions.push(
        {
          name: dimensionObj.name,
          dimension,
          group,
          selector: dimensionObj.selector,
          emptyObject: this.createEmptyObject(group.top(Infinity))
        }
      );
    }

    this.filter = filter || DataSet.createDefaultFilter();
  }

  get filter(): DataFilter {
    return this._filter;
  }

  set filter(filter: DataFilter) {
    console.log('Applying filter', filter, this.filter);
    if (!_.isEqual(this._filter, filter)) {
      this._filter = filter;
      let dimensionWrapper: Dimension;

      dimensionWrapper = _.find(this.dimensions, x => x.name === 'city');
      dimensionWrapper.dimension.filter(this.createFilter(filter.city));

      dimensionWrapper = _.find(this.dimensions, x => x.name === 'legalStatus');
      dimensionWrapper.dimension.filter(this.createFilter(filter.legalStatus));

      dimensionWrapper = _.find(this.dimensions, x => x.name === 'schoolType');
      dimensionWrapper.dimension.filter(this.createFilter(filter.schoolType));

      dimensionWrapper = _.find(this.dimensions, x => x.name === 'provider');
      dimensionWrapper.dimension.filter(this.createFilter(filter.provider));

      dimensionWrapper = _.find(this.dimensions, x => x.name === 'zip');
      dimensionWrapper.dimension.filter(this.createFilter(filter.zip));

      this.updateData();
    }
  }

  get dimensionNames(): string[] {
    return this.dimensions.map(x => x.name);
  }

  get stratifyableDimensionNames(): string[] {
    const possibleDimensions = ['city', 'legalStatus', 'schoolType', 'provider', 'zip'];
    return this.dimensions.filter(x => possibleDimensions.indexOf(x.name) > -1).map(x => x.name);
  }

  private updateData(): void {
    console.log('update data');

    this.all = this._crossfilterDs.allFiltered();

    let dimensionWrapper: Dimension;

    dimensionWrapper = _.find(this.dimensions, x => x.name === 'city');
    this.city = dimensionWrapper.group.top(Infinity);

    dimensionWrapper = _.find(this.dimensions, x => x.name === 'schoolType');
    this.schoolType = dimensionWrapper.group.top(Infinity);

    dimensionWrapper = _.find(this.dimensions, x => x.name === 'legalStatus');
    this.legalStatus = dimensionWrapper.group.top(Infinity);

    dimensionWrapper = _.find(this.dimensions, x => x.name === 'provider');
    this.provider = dimensionWrapper.group.top(Infinity);

    dimensionWrapper = _.find(this.dimensions, x => x.name === 'zip');
    this.zip = dimensionWrapper.group.top(Infinity);
  }

  private createFilter(filterValue: any | any[]): any {
    if (Array.isArray(filterValue)) {
      if (filterValue.length === 0) { return null; }
      return (d: any) => filterValue.indexOf(d) > -1;
    }
    return filterValue;
  }


  private createEmptyObject(group: KeyValue[]): any | null {
    return group.map(x => x.key).reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});
  }


  stratifyBy(dimensionName: string): void {
    // console.log('stratifying', dimensionName);
    if (this._stratifiedBy !== dimensionName) {
      const dimension = _.find(this.dimensions, x => x.name === dimensionName);
      this._stratifiedBy = dimensionName;
      console.log(dimension);
      if (!dimension) {
        this.dimensions.forEach(x => {
          if (x.group) {
            x.group.dispose();
          }
          x.group = x.dimension.group().reduceCount();
        });
      } else {
        console.log('perform actually stratify');
        this.dimensions.forEach(x => {
          console.log('stratifiying for', x.name);
          if (x.group) {
            x.group.dispose();
          }
          console.log(x.group.top(Infinity));
          const add = (prev, cur) => {
            const stratValue = dimension.selector(cur);
            prev[stratValue] += 1;
            return prev;
          };
          const remove = (prev, cur) => {
            const stratValue = dimension.selector(cur);
            prev[stratValue] -= 1;
            return prev;
          };
          x.group = x.dimension.group().reduce(add, remove, () => ({ ...dimension.emptyObject }));
          console.log(x.group.top(Infinity));
        });
      }
      this.updateData();
    }
  }
}
