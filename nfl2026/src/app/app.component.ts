import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { RoutesPageComponent } from './routes-page/routes-page.component';
import { PlayersComponent } from "./players/players.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, RoutesPageComponent, RouterLink, RouterOutlet, PlayersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nfl2026';
}
