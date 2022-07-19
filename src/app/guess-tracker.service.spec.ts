import { TestBed } from '@angular/core/testing';

import { GuessTrackerService } from './guess-tracker.service';

describe('GuessTrackerService', () => {
  let service: GuessTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuessTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
