import { Component, inject } from '@angular/core';
import { FixturesService } from '../fixtures.service';

@Component({
  selector: 'app-scoring-stats',
  standalone: true,
  imports: [],
  templateUrl: './scoring-stats.component.html',
  styleUrl: './scoring-stats.component.css'
})
export class ScoringStatsComponent {

  stats: any[] = []
  selectedDivision: string = 'All'
  sortColumn: string = ''
  sortDirection: string = 'desc'

  fixturesService = inject(FixturesService)

  constructor() {
    this.fixturesService.getScoringStats().subscribe(response => {
      this.stats = response
      console.log(this.stats)
    })
  }

  setDivision(div: string) {
    this.selectedDivision = div
  }

  setSort(col: string) {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc'
    } else {
      this.sortColumn = col
      this.sortDirection = 'desc'
    }
  }

  get filteredStats() {
    let data = this.selectedDivision === 'All'
      ? this.stats
      : this.stats.filter(s => s.division === Number(this.selectedDivision))

    if (this.sortColumn) {
      data = [...data].sort((a, b) => {
        return this.sortDirection === 'desc'
          ? b[this.sortColumn] - a[this.sortColumn]
          : a[this.sortColumn] - b[this.sortColumn]
      })
    }

    return data
  }

}
