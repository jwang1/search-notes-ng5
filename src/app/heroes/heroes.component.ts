import {Component, OnInit} from '@angular/core';

import {Hero} from '../hero';
import {HEROES} from '../mock-heroes';

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

  heroes = HEROES;

  constructor() { }

  ngOnInit() {
    // undefined selectedHero accessed from heroes.component.html will be handled by *ngIf
    // this.selectedHero = this.hero;
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

}
