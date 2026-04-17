import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TeamsService } from '../teams.service';
import { Team } from '../team';

@Component({
  selector: 'app-team-ranking',
  standalone: true,
  imports: [],
  templateUrl: './team-ranking.component.html',
  styleUrl: './team-ranking.component.css'
})
export class TeamRankingComponent {
  teams: Team[] = []
  teamA: Team | null = null
  teamB: Team | null = null
  votesRemaining: number = 5

  teamsService = inject(TeamsService)
  http = inject(HttpClient)
  router = inject(Router)

  constructor() {
    this.teamsService.getTeams().subscribe(response => {
      this.teams = response
      this.pickRandomTeams()
    })
  }

  pickRandomTeams() {
    const shuffled = [...this.teams].sort(() => Math.random() - 0.5)
    this.teamA = shuffled[0]
    this.teamB = shuffled[1]
  }

  vote(team: Team) {
    this.http.put(`http://localhost:3000/teams/${team.name}/vote`, {}).subscribe(() => {
      this.votesRemaining--
      if (this.votesRemaining === 0) {
        this.router.navigate(['/teams'])
      } else {
        this.pickRandomTeams()
      }
    })
  }
}
