import { Injectable } from '@angular/core';
import { Guess } from './guess';

@Injectable({
  providedIn: 'root'
})
export class GuessTrackerService {

  remainingGuesses: number = 5;

  guesses: Guess[] = [];

  submitGuess(value : Guess):void {
    console.log('submitted')
    this.guesses.push(value);
    if (this.remainingGuesses > 0) {
      this.remainingGuesses = this.remainingGuesses - 1;
      console.log('remaining = ' + this.remainingGuesses);
    }
    

  }

  getRemainingGuesses() {
    return this.remainingGuesses;
  }

  getGuesses(): Guess[] {
    const guesses = this.guesses;
    return guesses;
  }
  constructor() { }
}
