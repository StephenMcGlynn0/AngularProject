import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from './team';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  url = "http://localhost:3000/teams"

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.url)
  }
}
