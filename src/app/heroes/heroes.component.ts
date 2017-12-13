import {Component, OnInit} from '@angular/core';

import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // property
  hero: Hero = {
    id: 1,
    name: 'Guan Yu'
  };

  selectedHero: Hero;

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  populateHeros(): void {
    this.heroService.getHeros().subscribe(heros => this.heroes = heros);
  }

  ngOnInit() {
    // undefined selectedHero accessed from heroes.component.html will be handled by *ngIf
    // this.selectedHero = this.hero;
    // calling the service
    this.populateHeros();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

}
