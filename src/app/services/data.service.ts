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
    this.http.get<School[]>('https://jedeschule.codefor.de/schools/?limit=40000').subscribe(x => {
      console.log('retrieving schools');
      x = x.map((school: School) => {
        school.school_type = school.school_type === null ? 'Unbekannt' : school.school_type;
        school.legal_status = school.legal_status === null || !school.legal_status ? 'Unbekannt' : school.legal_status;
        school.provider = school.provider === null || !school.provider ? 'Unbekannt' : school.provider;
        school.zip = school.zip === null || !school.zip ? 'Unbekannt' : school.zip;
        return school;
      })
      this.schools.next(x);
    });
  }

  getSchools(): Observable<School[]> {
    return this.schools.asObservable();
}


}
