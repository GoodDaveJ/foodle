import { Component, OnInit } from '@angular/core';
import { GuessTrackerService } from '../guess-tracker.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  constructor(private GuessTrackerService: GuessTrackerService) { }

  guesses = this.GuessTrackerService.guesses
  remainingGuesses = this.GuessTrackerService.remainingGuesses

  ngOnInit(): void {
  }

}
