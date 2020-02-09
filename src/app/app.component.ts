import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angucsv';

  objectToCsv = function (data) {
    const csvRows = [];

    // get the headers
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(','));

    //loop over the rows
    for (const row of data) {
      const values = headers.map(header => {
        return `"${row[header]}"`;
      });
      csvRows.push(values.join(','));
    }
    // form escaped coma separaed value
    return csvRows.join('\n');
  };

  download = function (data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'download.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a)
  };




  getReport = async function () {
    const jsonUrl = 'https://jsonplaceholder.typicode.com/users';
    const res = await fetch(jsonUrl);
    const json = await res.json();


    const data = json.map(row => ({
      name: row.name,
      username: row.username,
      phone: row.phone,
      website: row.website
    }));

    //console.log(data);
    const csvData = this.objectToCsv(data);

    this.download(csvData);

  }
}
