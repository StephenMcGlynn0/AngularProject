import { Component } from '@angular/core';
import { PlayersComponent } from '../players/players.component';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [],
  templateUrl: './routes-page.component.html',
  styleUrl: './routes-page.component.css'
})
export class RoutesPageComponent {
  content = "[]"

  playersClicked() {
    this.content = PlayersComponent
  }
}
