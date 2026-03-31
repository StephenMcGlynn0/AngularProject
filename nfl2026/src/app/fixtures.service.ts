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


  constructor(private http: HttpClient) { }

  getFixtures(): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(this.fixturesURL)
  }

  getResults(): Observable<Fixture[]> {
    return this.http.get<Fixture[]>(this.resultsURL)
  }
}
