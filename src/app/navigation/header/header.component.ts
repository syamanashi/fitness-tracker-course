import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth = false;
  componentActive = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authChange.pipe(takeWhile(() => this.componentActive)).subscribe((authStatus: boolean) => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  onToggleSidenav() {
    this.sideNavToggle.emit();
  }
}
