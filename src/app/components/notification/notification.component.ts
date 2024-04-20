import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  closeNotification() {
    this.close.emit();
  }

}
