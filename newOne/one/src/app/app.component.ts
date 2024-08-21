import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientDateComponent } from '../Com/client-date/client-date.component';
import { ClientComponent } from "../Com/client/client.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientComponent, ClientDateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'one';
}
