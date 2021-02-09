export class Util {
  public static convertToCSV(objArray): string {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    for (const line of array) {
      let result = '';
      for (const item of line) {
        if (result !== '') {
          result += ',';
        }

        result += item;
      }
      str += result + '\r\n';
    }

    return str;
  }

}
