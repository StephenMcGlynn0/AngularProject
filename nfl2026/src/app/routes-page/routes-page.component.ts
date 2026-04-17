import { Component, inject } from '@angular/core';
import { PlayersService } from '../players.service';
import { TeamsService } from '../teams.service';
import { ManagersService } from '../managers.service';
import { FixturesService } from '../fixtures.service';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.css'
})
export class RoutesPageComponent {
  content = "[]"

  playersService = inject(PlayersService)
  teamsService = inject(TeamsService)
  managersService = inject(ManagersService)
  fixturesService = inject(FixturesService)

  getData(route: string) {
    switch (route) {
      case 'players':
        this.playersService.getPlayers().subscribe(
          response => {
            this.content = JSON.stringify(response, null, 2)
            console.log(response)
          }
        )
        break;
      case 'teams':
        this.teamsService.getTeams().subscribe(
          response => {
            this.content = JSON.stringify(response, null, 2)
            console.log(response)
          }
        )
        break;
      case 'managers':
        this.managersService.getManagers().subscribe(
          response => {
            this.content = JSON.stringify(response, null, 2)
            console.log(response)
          }
        )
        break;
      case 'fixtures':
        this.fixturesService.getFixtures().subscribe(
          response => {
            this.content = JSON.stringify(response, null, 2)
            console.log(response)
          }
        )
        break;
      case 'results':
        this.fixturesService.getResults().subscribe(
          response => {
            this.content = JSON.stringify(response, null, 2)
            console.log(response)
          }
        )
        break;
      

    }
  }
}
