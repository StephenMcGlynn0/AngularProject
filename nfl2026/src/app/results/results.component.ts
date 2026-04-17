import { Component, inject } from '@angular/core';
import { FixturesService } from '../fixtures.service';
import { Fixture } from '../fixture';
import { Team } from '../team';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  results: any[] = []

  selectedDivision: string = 'All'

  fixturesService = inject(FixturesService)

  constructor() {
    this.fixturesService.getResultsAndTeamRGB().subscribe(
      response => {
        this.results = response
        console.log(response)
      }
    )
  }

  setDivision(div: string) {
    this.selectedDivision = div
  }

  get filteredResults() {
    if (this.selectedDivision === 'All') {
      return this.results
    }

    return this.results.filter(r => r.division === Number(this.selectedDivision))
  }

}
