import { Component, inject } from '@angular/core';
import { ManagersService } from '../managers.service';
import { Manager } from '../manager';

@Component({
  selector: 'app-managers',
  standalone: true,
  imports: [],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.css'
})
export class ManagersComponent {

  managers: Manager[] = []

  managersService = inject(ManagersService)

  constructor() {
    this.managersService.getManagers().subscribe(
      response => {
        this.managers = response
        console.log(response)
      }
    )
  }

}
