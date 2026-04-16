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
  teams: Team[] = []

  teamsService = inject(TeamsService)

  fixturesService = inject(FixturesService)

  constructor() {
    this.fixturesService.getResults().subscribe(
      response => {
        this.results = response
        console.log(response)
      }
    )

    this.teamsService.getTeams().subscribe(
      response => {
        this.teams = response
        console.log(response)
      }
    )

    this.results.forEach(result => {
        result.hteam = this.teams.find(t => t.name === result.hteam)
        result.ateam = this.teams.find(t => t.name === result.ateam)
      })
      console.log(this.results)
  }

}
