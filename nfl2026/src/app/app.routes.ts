import { Routes } from '@angular/router';
import { RoutesPageComponent } from './routes-page/routes-page.component';
import { ManagersComponent } from './managers/managers.component';
import { TeamsComponent } from './teams/teams.component';
import { ResultsComponent } from './results/results.component';
import { FixturesComponent } from './fixtures/fixtures.component';
import { TeamRankingComponent } from './team-ranking/team-ranking.component';
import { ScoringStatsComponent } from './scoring-stats/scoring-stats.component';

export const routes: Routes = [
    {path: '', component: RoutesPageComponent, title: 'Home'},
    {path: 'managers', component: ManagersComponent, title: 'Managers'},
    {path: 'teams', component: TeamsComponent, title: 'Teams'},
    {path: 'results', component: ResultsComponent, title: 'Results'},
    {path: 'fixtures', component: FixturesComponent, title: 'Fixtures'},
    { path: 'team-ranking', component: TeamRankingComponent, title: 'Team Rankings' },
    { path: 'scoring-stats', component: ScoringStatsComponent, title: 'Scoring Stats' }
];
