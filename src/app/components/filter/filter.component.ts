import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DataFilter} from '../../model/data-filter';
import {DataSet} from '../../model/data-set';
import {DataService} from '../../services/data.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnChanges {

  @Input() data: DataSet;
  @Input() filter: DataFilter;
  @Output() onFilterChanged: EventEmitter<DataFilter> = new EventEmitter<DataFilter>();

  cityLookups: any[];
  schoolTypeLookups: any[];
  legalStatusLookups: any[];
  providerLookups: any[];
  zipLookups: any[];

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      console.log('filter data', this.data);
      const mapKey = (x: {key: any}[]) => x.map((item) => item.key);
      this.cityLookups = mapKey(this.data.city);
      this.schoolTypeLookups = mapKey(this.data.schoolType);
      this.legalStatusLookups = mapKey(this.data.legalStatus);
      this.providerLookups = mapKey(this.data.provider);
      this.zipLookups = mapKey(this.data.zip);
    }
  }

  updateFilter(update: Partial<DataFilter>): void {
    this.onFilterChanged.emit(this.filter.update(update));
  }

  emptyArrayToNull(array: any[]): any[] {
    return array.length === 0 ? null : array;
  }

}
