import { Component, OnInit } from '@angular/core';
import { GuessTrackerService } from '../guess-tracker.service';

@Component({
  selector: 'app-remaining',
  templateUrl: './remaining.component.html',
  styleUrls: ['./remaining.component.scss']
})
export class RemainingComponent implements OnInit {

  constructor(private GuessTrackerService: GuessTrackerService) { }

  remainingGuesses = this.GuessTrackerService.getRemainingGuesses();

  getEmptyLines(n:number): Array<number> {
    if (this.remainingGuesses > 0) {
      let remainingGuesses = this.GuessTrackerService.getRemainingGuesses();
      return Array(remainingGuesses);
    } 
    return [0];
  }

  

  ngOnInit(): void {
  }

}
