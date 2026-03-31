import { Routes } from '@angular/router';
import { RoutesPageComponent } from './routes-page/routes-page.component';
import { ManagersComponent } from './managers/managers.component';

export const routes: Routes = [
    {path: '', component: RoutesPageComponent, title: 'Home'},
    {path: 'managers', component: ManagersComponent, title: 'Managers'},
];
