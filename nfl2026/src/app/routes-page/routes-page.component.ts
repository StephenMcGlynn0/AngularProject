import { Component, inject } from '@angular/core';
import { PlayersComponent } from '../players/players.component';
import { PlayersService } from '../players.service';

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

  getData(route : string){
    switch (route){
      case 'players':
        this.playersService.getPlayers().subscribe(
      response => {
        this.content = JSON.stringify(response, null, 2)
        console.log(response)
      }
    )
    }
  }
}
