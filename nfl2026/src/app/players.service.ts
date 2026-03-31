import { Injectable } from '@angular/core';
import { HttpClient}  from '@angular/common/http';
import { Player } from './player';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  url = "http://localhost:3000/players"

  constructor(private http : HttpClient) { }

  getPlayers() : Observable<Player[]>{
    return this.http.get<Player[]>(this.url)
  }
}
