import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit{
  usersPerRoleMap: { [role: string]: number } = {}; // Define the type for usersPerRoleMap
  genderRateMap: Map<string, number> = new Map();
  roles!: any[]; // Adjust the type based on your data structure
  usersPerGenderMap: { [gender: string]: number } = {}; // Define the type for usersPerGenderMap
  totalUsers!: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUserGenderRate();
    this.getUsersPerRole();
    this.fetchTotalNumberOfUsers();
  }

  
  getUserGenderRate(): void {
    this.userService.getUserGenderRate().subscribe(
      (data: any) => {
        // Assuming data is in the format { female: 16.67, male: 83.33 }
        this.usersPerGenderMap = data;
        console.log('User Gender Rate:', this.usersPerGenderMap);
        // Optionally, render any charts or display logic here
      },
      (error) => {
        console.error('Error fetching user gender rate:', error);
      }
    );
  }
  
  getUsersPerRole(): void {
    this.userService.getUsersPerRole().subscribe(
      (data: any) => {
        console.log('Received data:', data);
  
        // Initialize an empty object to store role counts
        this.usersPerRoleMap = {};
  
        // Iterate over the keys of the data object
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            // Assign key-value pair to the usersPerRoleMap
            this.usersPerRoleMap[key] = data[key];
          }
        }
  
        console.log('Users per Role:', this.usersPerRoleMap);
        this.renderUsersPerRoleChart(); // Render the chart after fetching data
      },
      (error) => {
        console.error('Error fetching users per role:', error);
      }
    );
  }

  renderUsersPerRoleChart(): void {
    const canvas = document.getElementById('usersPerRoleChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      console.error('Canvas context not available');
      return;
    }
  
    const roles = Object.keys(this.usersPerRoleMap);
    const userCounts = roles.map((role) => this.usersPerRoleMap[role]);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: roles,
        datasets: [
          {
            label: 'User Count',
            data: userCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    
   
  }
  fetchTotalNumberOfUsers(): void {
    this.userService.getTotalNumberOfUsers().subscribe(
      (data) => {
        this.totalUsers = data;
        console.log('Total Users:', this.totalUsers);
      },
      (error) => {
        console.error('Error fetching total number of users:', error);
      }
    );
  }


}
