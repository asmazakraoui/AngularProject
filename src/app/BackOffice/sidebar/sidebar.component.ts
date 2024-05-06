import { Component, ElementRef, OnInit, ViewChild,Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @ViewChild('collapseToggle', { static: true }) collapseToggle!: ElementRef;

  constructor(private router:Router,private renderer: Renderer2){}

  showSettingsPanel: boolean = false;

    toggleSettingsPanel() {
        this.showSettingsPanel = !this.showSettingsPanel;
    }


  /*  logout(): void {
      this.registerService.logout().subscribe(
        (response) => {
          console.log('Logout successful:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Logout failed:', error);
          // Handle error if logout fails
        }
      );
    }*/
    ngOnInit() {
      this.renderer.listen(this.collapseToggle.nativeElement, 'click', () => {
        const target = '#myCollapse';
        const element = document.querySelector(target) as HTMLElement;
        if (element) {
          if (element.classList.contains('show')) {
            this.renderer.removeClass(element, 'show');
          } else {
            this.renderer.addClass(element, 'show');
          }
        }
      });
      $(document).ready(() => {
        $('[data-toggle="collapse"]').collapse();
        $('.dropdown-toggle').dropdown();
      });
    }
    
    toggleCollapse() {
      // Implement toggleCollapse functionality if needed
      // For example, you can toggle a boolean flag here
    }

}
