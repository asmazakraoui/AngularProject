import { Component } from '@angular/core';
import { Role, TypeRole } from 'src/models/role';
import { RoleService } from '../Services/role.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

  role: Role = {
    name: '',
    roleName: TypeRole.PATIENT
  };

  typeRoles = Object.values(TypeRole);

  constructor(private roleService: RoleService , private router:Router) { }

  addRole(): void {
    this.roleService.addRole(this.role).subscribe(
      (response) => {
        console.log('Role added successfully:', response);
      },
      (error) => {
        console.error('Error adding role:', error);
      }
    );
  }

  
}
