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

  heroes = HEROES;

  constructor() { }

  ngOnInit() {
  }

}
