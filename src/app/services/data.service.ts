import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Papa } from 'ngx-papaparse';

import * as _ from 'lodash';
import {School} from '../model/school';

@Injectable({
  providedIn: 'root'
})
export class DataService{
  private schools = new BehaviorSubject<School[]>([]);

  constructor(private http: HttpClient, private papa: Papa) {
    console.log('creating dataService');
    // this.http.get<School[]>('https://jedeschule.codefor.de/schools/?limit=50000').subscribe(x => {
    //   console.log('retrieving schools');
    //   x = x.map((school: School) => {
    //     // school.school_type = !school.school_type || school.school_type === null || school.school_type === '' ? 'Unbekannt' : school.school_type;
    //     school.school_type = this.cleanDataValue(school.school_type);
    //     school.legal_status = this.cleanDataValue(school.legal_status);
    //     school.provider = this.cleanDataValue(school.provider);
    //     school.zip = this.cleanDataValue(school.zip);
    //     return school;
    //   });
    //   console.log(x);
    //   this.schools.next(x);
    // });
    this.http.get('https://jedeschule.codefor.de/csv-data/latest.csv', { responseType: 'text' } ).subscribe((x: string) => {
      console.log('retrieving schools');
      const schools = this.papa.parse(x, {header: true}).data;
      schools.splice(-1, 1);
      console.log(schools);
      const i = 0;
      const cleanedSchools = schools.map((school: School) => {
        return this.cleanSchool(school);
      });
      console.log(cleanedSchools);
      this.schools.next(cleanedSchools);
    });
  }

  getSchools(): Observable<School[]> {
    return this.schools.asObservable();
  }

  cleanSchool(school: School): School {
    if (!school.id || school.id === '' ) {
      console.error('School Id must be provided');
      console.log(school);
    }

    school.address = this.cleanDataValue(school.address);
    school.address2 = this.cleanDataValue(school.address2);
    school.city = this.cleanDataValue(school.city);
    school.director = this.cleanDataValue(school.director);
    school.email = this.cleanDataValue(school.email);
    school.fax = this.cleanDataValue(school.fax);
    school.legal_status = this.cleanDataValue(school.legal_status);
    school.name = this.cleanDataValue(school.name);
    school.phone = this.cleanDataValue(school.phone);
    school.provider = this.cleanDataValue(school.provider);
    school.school_type = this.cleanDataValue(school.school_type);
    school.website = this.cleanDataValue(school.website);
    school.zip = this.cleanDataValue(school.zip);
    return school;
  }

  cleanDataValue(val): any {
    return !val || val === null || val === '' ? 'Unbekannt' : val;
  }


}
