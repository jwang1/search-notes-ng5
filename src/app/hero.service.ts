import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { Hero} from './hero';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';


//////// constants //////////

const httpOptions: any = {
  header: new HttpHeaders({ 'Content-Type': 'application/json'})
};


//////// class - exported to be used elsewhere //////////

@Injectable()
export class HeroService {

  //////// private fields //////////

  private heroesUrl = 'api/heroes';  // URL to web api

  //////// private methods //////////

  private log(msg: string) {
    this.messageService.add('HeroService: ' + msg);
  }

  /**
   * Notice the return, which is a function, passed in any type, returns an Obserable<T> of type T
   *
   * @param {string} operation
   * @param {T} result
   * @returns {(error: any) => Observable<T>}
   */
  private handleErr<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //////// constructor - for Dependency-Injection //////////

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  //////// Get methods //////////

  getHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleErr('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
          tap(_ => this.log(`fetched hero id=${id}`)),
          catchError(this.handleErr<Hero>(`getHero id=${id}`))
    );
  }

  //////// Update methods //////////

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
          tap(_ => this.log(`updated hero id=${hero.id}`)),
          catchError(this.handleErr<any>('updateHero'))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
          // for tap, do NOT define (hero: Hero), otherwise, "TSLint" error will pop up.
          tap(_ => this.log(`added hero w/ id=${hero.id}`)),

          // not sure why NOT able to use <Hero> for handleErr here,  instead need to use <any>
          // but, handleErr does return (error: any);
          catchError(this.handleErr<any>('addHero'))
    );
  }

  //////// Delete methods //////////

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;

    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(this.heroesUrl, httpOptions)
      .pipe(
        tap(_ => this.log(`delete hero with id=${id}`)),
        catchError(this.handleErr<any>(`deleteHero`))
      );
  }

  //////// Search methods //////////

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`api/heroes/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching ${term}`)),
        catchError(this.handleErr<any>('searchHeroes'))
      );
  }

}
