import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeNavToggle = new EventEmitter<void>();

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onClose() {
    this.closeNavToggle.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
