import {Component, Input, OnInit} from '@angular/core';
import {DataSet} from '../../model/data-set';

@Component({
  selector: 'app-stratify',
  templateUrl: './stratify.component.html',
  styleUrls: ['./stratify.component.scss']
})
export class StratifyComponent implements OnInit {

  @Input() data: DataSet;
  constructor() { }

  ngOnInit(): void {
  }

  onStratify(dimensionName: string): void {
    console.log('stratifying', dimensionName);
    this.data.stratifyBy(dimensionName);
  }

  textForDimension(text: string): string {
    const dict = { gender: 'Geschlecht', age: 'Alter', cause: 'Anlass', type: 'Typ', source: 'Quelle', arrival: 'Ankunftszeit',
      hospital: 'Krankenhaus', area: 'Bereich', department: 'Fachbereich', infectious: 'infektiös', ventilated: 'beatmet',
      reanimated: 'reanimiert', arrivalHour: 'Ankunftszeit (Stunde)', arrivalWeek: 'Ankunftszeit (Woche)', patientAssignmentCodeText: 'PZC'};
    // if (!dict[text]) { console.log('looking for ', text); }
    return dict[text] || text;
  }
}
