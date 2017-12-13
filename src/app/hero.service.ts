import { Injectable } from '@angular/core';

import { Hero} from './hero';
import { HEROES} from './mock-heroes';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeros(): Observable<Hero[]> {
    this.messageService.add('MessageService fetched heroes [' +
        HEROES.map(function (h) { return h.id + ':' + h.name; }).join(',')
      + ']');
    return of(HEROES);
  }

}
