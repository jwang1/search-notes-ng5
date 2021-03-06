import {Component, OnInit} from '@angular/core';

import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';


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

  add(name: string): void {
    name = name.trim();

    if (!name) {
      return;
    }

    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    // still need to subscribe() for deleteHero api which does not return any Observable
    // if not subscribe(), the request will NOT be sent -- the async nature of the RxJS
    this.heroService.deleteHero(hero).subscribe();
  }

}
