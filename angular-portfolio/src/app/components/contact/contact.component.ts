import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  private readonly email = 'alejandrovasile44@gmail.com';
  private readonly linkedin = 'https://www.linkedin.com/in/alex-v-28b5b2263?utm_source=share_via&utm_content=profile&utm_medium=member_android';
  private readonly github = 'https://github.com/macgenious';

  openGmail(): void {
    const subject = encodeURIComponent('Hello from your portfolio!');
    const body = encodeURIComponent('Hi,\n\nI came across your portfolio and would love to connect.\n\n');
    window.open(`https://mail.google.com/mail/?view=cm&to=${this.email}&su=${subject}&body=${body}`, '_blank');
  }

  openLinkedIn(): void {
    window.open(this.linkedin, '_blank');
  }

  openGitHub(): void {
    window.open(this.github, '_blank');
  }
}
