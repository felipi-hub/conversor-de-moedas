import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

}
