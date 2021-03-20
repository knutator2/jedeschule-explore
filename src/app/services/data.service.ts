import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import * as _ from 'lodash';
import {School} from '../model/school';

@Injectable({
  providedIn: 'root'
})
export class DataService{
  private schools = new BehaviorSubject<School[]>([]);

  constructor(private http: HttpClient) {
    console.log('creating dataService');
    this.http.get<School[]>('https://jedeschule.codefor.de/schools/?limit=50000').subscribe(x => {
      console.log('retrieving schools');
      x = x.map((school: School) => {
        // school.school_type = !school.school_type || school.school_type === null || school.school_type === '' ? 'Unbekannt' : school.school_type;
        school.school_type = this.cleanDataValue(school.school_type);
        school.legal_status = this.cleanDataValue(school.legal_status);
        school.provider = this.cleanDataValue(school.provider);
        school.zip = this.cleanDataValue(school.zip);
        return school;
      });
      console.log(x);
      this.schools.next(x);
    });
  }

  getSchools(): Observable<School[]> {
    return this.schools.asObservable();
  }

  cleanDataValue(val) {
    return !val || val === null || val === '' ? 'Unbekannt' : val;
  }


}
