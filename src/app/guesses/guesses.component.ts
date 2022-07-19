import { GuessTrackerService } from './../guess-tracker.service';
import { Component, OnInit } from '@angular/core';
import { Guess } from '../guess';

@Component({
  selector: 'app-guesses',
  templateUrl: './guesses.component.html',
  styleUrls: ['./guesses.component.scss']
})
export class GuessesComponent implements OnInit {

  constructor(private GuessTrackerService: GuessTrackerService) { }

  guesses: Guess[] = this.GuessTrackerService.getGuesses();

  ngOnInit(): void {
  }

}
