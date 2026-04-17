import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fixture } from './fixture';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  fixturesURL = "http://localhost:3000/fixtures"
  resultsURL = "http://localhost:3000/results"
  resultsAndTeamRGBURL = "http://localhost:3000/resultsandteamrgb"
  fixturesAndTeamRGBURL = "http://localhost:3000/fixturesandteamrgb"


  constructor(private http: HttpClient) { }

  getFixtures(): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(this.fixturesURL)
  }

  getResults(): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(this.resultsURL)
  }

  getResultsAndTeamRGB(): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(this.resultsAndTeamRGBURL)
  }

  getFixturesAndTeamRGB(): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(this.fixturesAndTeamRGBURL)
  }
}
