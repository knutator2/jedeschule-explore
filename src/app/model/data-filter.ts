export class DataFilter {
  public city: string | string[] | null = null;
  public schoolType: string | string[] | null = null;
  public legalStatus: string | string[] | null = null;
  public provider: string | string[] | null = null;
  public zip: string | string[] | null = null;

  getCityPredicate(): (cityKey: number) => boolean {
    return this.getPredicate('city');
  }

  getSchoolTypePredicate(): (cityKey: number) => boolean {
    return this.getPredicate('schoolType');
  }

  getLegalStatusPredicate(): (cityKey: number) => boolean {
    return this.getPredicate('legalStatus');
  }

  getProviderPredicate(): (cityKey: number) => boolean {
    return this.getPredicate('provider');
  }

  getZipPredicate(): (cityKey: number) => boolean {
    return this.getPredicate('zip');
  }

  toggleCityFilterValue(value: any): DataFilter {
    return this.toggleFilterValue('city', value);
  }

  toggleSchoolTypeFilterValue(value: any): DataFilter {
    const result = this.toggleFilterValue('schoolType', value);
    console.log('filter update SchoolType', value);
    return result;
  }

  toggleLegalStatusFilterValue(value: any): DataFilter {
    return this.toggleFilterValue('legalStatus', value);
  }

  toggleProviderFilterValue(value: any): DataFilter {
    return this.toggleFilterValue('provider', value);
  }

  toggleZipFilterValue(value: any): DataFilter {
    return this.toggleFilterValue('zip', value);
  }

  private toggleFilterValue(key: 'city' | 'schoolType' | 'legalStatus' | 'provider' | 'zip', value: any): DataFilter {
    let newFilterValue: any;
    const filter: any | any[] = this[key];

    if (filter === null) {
      newFilterValue = [value];
    }
    else if (Array.isArray(filter)) {
      const valueIndex = filter.indexOf(value);
      if (valueIndex > -1) {
        const newValues = filter.filter((x, i) => i !== valueIndex);
        newFilterValue = newValues.length === 0 ? null : newValues;
      }
      else {
        newFilterValue = [...filter, ...[value]];
      }
    } else {
      if (filter === value) {
        newFilterValue = null;
      } else {
        newFilterValue = [filter, value];
      }
    }

    const update: any = {};
    update[key] = newFilterValue;
    console.log('filter updates', update);
    return this.update(update);
  }

  update(update: Partial<DataFilter>): DataFilter {
    const newValues = { ...this, ...update };

    const newFilter = new DataFilter();
    newFilter.city = Array.isArray(newValues.city) ? [...newValues.city] : newValues.city;
    newFilter.schoolType = Array.isArray(newValues.schoolType) ? [...newValues.schoolType] : newValues.schoolType;
    newFilter.legalStatus = Array.isArray(newValues.legalStatus) ? [...newValues.legalStatus] : newValues.legalStatus;
    newFilter.provider = Array.isArray(newValues.provider) ? [...newValues.provider] : newValues.provider;
    newFilter.zip = Array.isArray(newValues.zip) ? [...newValues.zip] : newValues.zip;
    console.log('new Filter', newFilter);
    return newFilter;
  }

  private getPredicate(key: 'city' | 'schoolType' | 'legalStatus' | 'provider' | 'zip'): (key: any) => boolean {
    const value = this[key];
    if (value === null) { return () => true; }
    if (Array.isArray(value)) { return (x: any) => (value as any[]).indexOf(x) > -1; }
    return (x) => x === value;
  }
}
