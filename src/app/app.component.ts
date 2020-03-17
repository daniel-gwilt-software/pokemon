import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pokemon = []

  constructor(private http: HttpClient) {
    this.http
      .get('https://pokeapi.co/api/v2/pokemon/?limit=151')
      .subscribe((data: any) => {
        for (let i = 0; i < data.results.length; i++) {
          this.pokemon.push({
            id: i + 1,
            name: data.results[i].name,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
              (i + 1) +
              '.png',
          });
        }
        console.log(this.pokemon);
      });
  }
}
