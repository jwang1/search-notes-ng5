import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HeroService} from '../hero.service';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
/*
import {debounceTime} from 'rxjs/operator/debounceTime';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {switchMap} from 'rxjs/operators';
*/



@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  // The $ is a convention that indicates heroes$ is an Observable, not an array.
  heroes$: Observable<Hero[]>;

  private searchTerms = new Subject<String>();

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroes$ = this.searchTerms
      .pipe(
        // wait 300 ms after each keystroke before searching
        debounceTime(300),

        // ignore new term if same as previous
        distinctUntilChanged(),

        // switch to new search observalbe each time term changes
        switchMap((term: string) => this.heroService.searchHeroes(term)),
      );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
