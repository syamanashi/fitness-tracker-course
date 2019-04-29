import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output() closeNavToggle = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  onClose() {
    this.closeNavToggle.emit();
  }
}
