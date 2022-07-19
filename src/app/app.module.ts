import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GuessWordComponent } from './guess-word/guess-word.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GuessesComponent } from './guesses/guesses.component';
import { RemainingComponent } from './remaining/remaining.component';

@NgModule({
  declarations: [
    AppComponent,
    GuessWordComponent,
    GameBoardComponent,
    GuessesComponent,
    RemainingComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
