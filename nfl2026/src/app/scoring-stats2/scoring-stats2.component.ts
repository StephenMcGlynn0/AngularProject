import { Component, inject } from '@angular/core';
import { FixturesService } from '../fixtures.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scoring-stats2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scoring-stats2.component.html',
  styleUrl: './scoring-stats2.component.css'
})
export class ScoringStats2Component {
  results: any[] = []
  rounds = [1, 2, 3, 4, 5]
  divisions = [1, 2, 3, 4]

  fixturesService = inject(FixturesService)

  constructor() {
    this.fixturesService.getResults().subscribe(response => {
      this.results = response
    })
  }

  getTotalPerMatch(division: number, round: number): number {
    const matches = this.results.filter(r => r.division === division && r.round === round)
    if (matches.length === 0) return 0
    const total = matches.reduce((sum, r) => sum + r.hteamtotal + r.ateamtotal, 0)
    return Math.round((total / matches.length) * 10) / 10
  }

  getTeams(): string[] {
    const teams = new Set<string>()
    this.results.forEach(r => {
      teams.add(r.hteam)
      teams.add(r.ateam)
    })
    return Array.from(teams).sort()
  }

  getTeamRoundScore(team: string, round: number): number {
    const homeMatch = this.results.find(r => r.hteam === team && r.round === round)
    if (homeMatch) return homeMatch.hteamtotal

    const awayMatch = this.results.find(r => r.ateam === team && r.round === round)
    if (awayMatch) return awayMatch.ateamtotal

    return 0
  }
}
