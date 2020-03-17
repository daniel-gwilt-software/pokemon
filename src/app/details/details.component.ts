import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  details;

  private httpOptions;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-api-key': 'HHko9Fuxf293b3w56zAJ89s3IcO9D5enaEPIg86l'
        })
      };
    }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.http.get('https://pokeapi.co/api/v2/pokemon/' + params.get('id'))
      )
    ).subscribe(results => {
      this.details = results;
      this.details.name = this.details.name.replace(/^\w/, c => c.toUpperCase());

      this.http.get('https://api.craft-demo.net/pokemon/' + this.details.id,
          this.httpOptions)
        .subscribe((data: any) => {
          this.details.locations = data.locations;
        });
      console.log('details: ', this.details);
    });
  }

}
