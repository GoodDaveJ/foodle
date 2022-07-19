export interface Guess {
  guessString : string,
  correct : boolean,
  letters: Letters[]
};

export interface Letters {
  letter: string,
  isInWord:boolean,
  isInCorrectPlace: boolean
};
 