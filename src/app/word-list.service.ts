import { Injectable } from '@angular/core';
import { Word } from './word';
import { Foods } from './mock-words';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordListService {


  getFoods(): Observable<Word[]> {
    const foods = of(Foods);
    return foods;
  }

  constructor() { }
}
