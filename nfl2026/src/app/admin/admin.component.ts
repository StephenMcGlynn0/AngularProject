import { Component, inject } from '@angular/core';
import { FixturesService } from '../fixtures.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  fixtures: any[] = []
  errorMessages: any = {}

  fixturesService = inject(FixturesService)
  http = inject(HttpClient)

  constructor() {
    this.http.get<any[]>('http://localhost:3000/fixtures/all').subscribe(response => {
      this.fixtures = response
    })
  }

  parseScore(score: string): { gls: number, pts2: number, pts1: number, total: number } | null {
    const regex = /^\d+-\d+-\d+$/
    if (!regex.test(score)) return null
    const parts = score.split('-')
    const gls = Number(parts[0])
    const pts2 = Number(parts[1])
    const pts1 = Number(parts[2])
    const total = gls * 3 + pts2 * 2 + pts1
    return { gls, pts2, pts1, total }
  }

  update(fixture: any, hscore: string, ascore: string) {
    const home = this.parseScore(hscore)
    const away = this.parseScore(ascore)

    if (!home) {
      this.errorMessages[fixture.id] = 'Invalid home score format, use 0-0-0'
      return
    }
    if (!away) {
      this.errorMessages[fixture.id] = 'Invalid away score format, use 0-0-0'
      return
    }

    this.errorMessages[fixture.id] = ''

    const body = {
      hteam: fixture.hteam,
      ateam: fixture.ateam,
      hteamscore: hscore,
      ateamscore: ascore,
      hgls: home.gls,
      h2pts: home.pts2,
      h1pts: home.pts1,
      hteamtotal: home.total,
      agls: away.gls,
      a2pts: away.pts2,
      a1pts: away.pts1,
      ateamtotal: away.total
    }

    this.http.put(`http://localhost:3000/fixtures/${fixture.id}`, body).subscribe(response => {
      console.log('Updated', response)
    })
  }
}
