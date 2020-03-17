import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  pokemonList = [];
  loaded = false;

  constructor(private http: HttpClient) {}

  getPokemonList() {
    const result = this.http
      .get('https://pokeapi.co/api/v2/pokemon/?limit=151');
    result.subscribe((data: any) => {
        for (let i = 0; i < data.results.length; i++) {
          this.pokemonList.push({
            id: i + 1,
            name: data.results[i].name,
            image:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' +
              (i + 1) +
              '.png',
          });
        }
        console.log(this.pokemonList);
        return this.pokemonList;
      });
    return result;
  }
}
