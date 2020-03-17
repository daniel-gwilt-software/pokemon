import { LoaderService } from './../loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  pokemon = [];

  constructor(private loader: LoaderService) { }

  ngOnInit() {
    this.loader.getPokemonList().subscribe(() => {
      this.pokemon = this.loader.pokemonList;
    });
  }

  onKeyUp(value: string) {
    this.pokemon = this.loader.pokemonList
      .filter(poke => poke.name.startsWith(value));
  }

}
