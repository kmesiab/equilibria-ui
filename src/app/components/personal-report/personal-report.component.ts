import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopBarComponent } from '../top-bar/top-bar.component';

@Component({
  selector: 'app-personal-report',
  standalone: true,
  imports: [
    SidebarComponent,
    TopBarComponent
  ],
  templateUrl: './personal-report.component.html',
  styleUrl: './personal-report.component.scss'
})
export class PersonalReportComponent {

  now = new Date();

}
