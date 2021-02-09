import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {School} from '../../model/school';

@Component({
  selector: 'app-widget-linelist',
  templateUrl: './widget-linelist.component.html',
  styleUrls: ['./widget-linelist.component.scss']
})
export class WidgetLinelistComponent implements OnInit, OnChanges {

  @Input() data: School[];

  constructor() { }

  columnDefs = [
    { headerName: '#', valueGetter: 'node.rowIndex + 1', width: 200},
    { field: 'id', filter: true, sortable: true },
    { field: 'name', filter: true, sortable: true},
    { field: 'address', filter: true, sortable: true},
    { field: 'address2', filter: true, sortable: true},
    { field: 'zip', filter: true, sortable: true},
    { field: 'city', filter: true, sortable: true},
    { field: 'website', filter: true, sortable: true},
    { field: 'email', filter: true, sortable: true},
    { field: 'school_type', filter: true, sortable: true},
    { field: 'legal_status', filter: true, sortable: true},
    { field: 'provider', filter: true, sortable: true},
    { field: 'fax', filter: true, sortable: true},
    { field: 'phone', filter: true, sortable: true},
    { field: 'director', filter: true, sortable: true}
  ];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('linelist changes', changes);
  }

}
