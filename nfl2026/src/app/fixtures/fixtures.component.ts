import { Component, inject } from '@angular/core';
import { FixturesService } from '../fixtures.service';
import { Fixture } from '../fixture';

@Component({
  selector: 'app-fixtures',
  standalone: true,
  imports: [],
  templateUrl: './fixtures.component.html',
  styleUrl: './fixtures.component.css'
})
export class FixturesComponent {

  fixturesService = inject(FixturesService)
  fixtures: Fixture[] = []
  selectedDivision: string = 'All'

  constructor() {
    this.fixturesService.getFixturesAndTeamRGB().subscribe(
      response => {
        this.fixtures = response
        console.log(response)
      }
    )
  }

  setDivision(div: string) {
    this.selectedDivision = div
  }

  get filteredFixtures() {
    if (this.selectedDivision === 'All') {
      return this.fixtures
    }

    return this.fixtures.filter(r => r.division === Number(this.selectedDivision))

  }
}
