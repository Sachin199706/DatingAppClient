import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [NgIf],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css'
})
export class ContextMenuComponent {
  @Input() x = 0;
  @Input() y = 0;
  @Input() visible = false;

  @Output() viewUser = new EventEmitter<void>();

  onViewUser() {
    this.viewUser.emit();
  }
}
