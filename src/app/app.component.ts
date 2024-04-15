import { PostService } from './Services/post.service';
import { Component } from '@angular/core';
import { RoleService } from './Services/role.service';
import { RegisterService } from './Services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularProjPi';

}
