import { Component, inject } from '@angular/core';
import { Team } from '../team';
import { TeamsService } from '../teams.service';


@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {
  teams: Team[] = []
  
    teamsService = inject(TeamsService)
  
    constructor() {
      this.teamsService.getTeams().subscribe(
        response => {
          this.teams = response
          console.log(response)
        }
      )
    }

}
