import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {DataSet} from '../../model/data-set';
import {DataFilter} from '../../model/data-filter';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: DataSet = new DataSet([]);


  constructor(private dataService: DataService) {
    console.log('creating dashboard');
  }

  ngOnInit(): void {
    console.log('init dashboard');
    this.dataService.getSchools().subscribe(
      (schools) => {
        console.log(schools);
        this.data = new DataSet(schools);
        this.data.filter = new DataFilter();
      }
    );
  }
}
