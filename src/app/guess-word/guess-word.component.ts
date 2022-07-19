import { Component, OnInit } from '@angular/core';
import { Word } from '../word';
import { Guess, Letters } from '../guess';
import { WordListService } from '../word-list.service';
import { GuessTrackerService } from '../guess-tracker.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-guess-word',
  templateUrl: './guess-word.component.html',
  styleUrls: ['./guess-word.component.scss']
})
export class GuessWordComponent implements OnInit {
  
  constructor(private WordListService: WordListService, private GuessTrackerService: GuessTrackerService) { }

  wordLength: number = 5; // Should never change, but can if needed

  foods: Word[] = [];
  word?: Word;
  
  wordLetters: string[] = [];
  guess: string = '';
  guessArray: string[] = [];
  emptyLetters: string[] = ['','','','',''];
  key: string | undefined;
  guesses: string[] = [];
  winner: boolean = false;
  loser: boolean = false;
  remainingGuesses = this.GuessTrackerService.remainingGuesses;

  getFoods(): void {
    this.WordListService.getFoods()
    .subscribe(foods => {
      this.foods = foods;
      this.getFood(foods);
    })   
  }

  getFood(Foods: Word[]): void {
    const wordIndex = ~~(Math.random() * Foods.length);
    this.word = Foods[wordIndex];

    this.wordLetters = this.splitLetters(this.word.string);
    console.log(this.wordLetters);
  }

  isGuessValid(guess: string): boolean{
    let isValid:boolean = false;
    const filteredFoods = this.foods.filter((food) => food.string === guess);
    if (filteredFoods.length) {
      isValid = true;
    }
    return isValid;
  } 

  isLetterInWord(letter:string):boolean {
    if (this.word?.string.includes(letter)) {
      return true;
    }
    return false;
  }

  isLetterInPlace(letter:string, position:number):boolean {
      if (this.wordLetters[position] === letter) {
        return true;
      }
    
    return false;
  }

  splitLetters(string:string): string[] {
    let lettersArray: string[] = [];
    for(let i = 0; this.wordLength > i; i++) {
      let thisLetter = string.substring(i,(i+1));
      lettersArray.push(thisLetter.toLowerCase());
    }
    return lettersArray;
  }

  buildLettersArray (word:string) : Letters[] {
    let letters: Letters[] = [];
    let lettersArray = this.splitLetters(word);

    for (let i = 0; lettersArray.length > i; i++) {
      let thisLetter = lettersArray[i];
      let isLetterInWord = this.isLetterInWord(thisLetter);
      let isLetterInPlace = this.isLetterInPlace(thisLetter,i);

      letters.push({
        letter : thisLetter,
        isInWord : isLetterInWord,
        isInCorrectPlace : isLetterInPlace
      });
    }     

    return letters;
  };

  handleSubmit(): void {
    let guessToSubmit: Guess;
    let correct: boolean = false; 
    if (this.guess.length === 5) {
      const isGuessValid: boolean = this.isGuessValid(this.guess);

      if (isGuessValid) {
        if (this.guess === this.word?.string) {
          correct = true;
          console.log('You got it, the food is '+ this.word.string);
        } else {
          this.guesses.push(this.guess);
          console.log(this.guess + ' is not the food');
          correct = false;
        }
        guessToSubmit = {
          'guessString' : this.guess,
          'correct' : correct,
          'letters': this.buildLettersArray(this.guess)
        }
        this.guess = '';
        this.guessArray = [];
        this.emptyLetters = ['','','','',''];
        this.GuessTrackerService.submitGuess(guessToSubmit);

      } else {
        console.log('Not a valid Guess');
      }

    } else {
      console.log('Must Be 5 Letters');
    }
  } 

  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.key = event.key;

    if(this.remainingGuesses > 0) {
      if(this.key === 'Enter') {
        this.handleSubmit();
    } else {
      if (this.key.match(/^[A-Za-z]+$/) && this.key !== 'Backspace') {
        if (this.guess.length < 5) {
          this.guess = this.guess + this.key;
          this.guessArray = this.splitLetters(this.guess);

          this.emptyLetters = [];

          let fillCount = 5 - this.guessArray.length;

            for(var i = 0; i < fillCount; i++){
              this.emptyLetters.push('');
            }
        }
      } else if (this.key === 'Backspace') {
        if (this.guess.length > 0) {
          let undoLetter = this.guess.substring(0, this.guess.length - 1);
          this.guess = undoLetter;
          this.guessArray = this.splitLetters(this.guess);
        }



      } else {
        console.log('Do NOTHING!');
      }
    }
    }


  }

  ngOnInit(): void {
    this.getFoods();    
  }
}

