import { Component, inject } from '@angular/core';
import { Player } from '../player';
import { PlayersService } from '../players.service';

@Component({
  selector: 'app-players',
  standalone: true,
  imports: [],
  templateUrl: './players.component.html',
  styleUrl: './players.component.css'
})
export class PlayersComponent {
  players : Player[] = [];

  playersService = inject(PlayersService)

  constructor(){
    this.playersService.getPlayers().subscribe(
      response => {
        this.players = response
      }
    )
  }


}
