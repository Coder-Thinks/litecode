import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PowerService } from '../../services/power/power.service';
import { powerModel } from '../../Models/powerModel';
import { CommonModule } from '@angular/common';
//import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import {ChangeDetectionStrategy} from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-client',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,MatFormFieldModule, MatDatepickerModule, MatIconModule,RouterLink,MatInputModule,MatTooltipModule,MatAutocompleteModule,ReactiveFormsModule],
  
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  
 //@ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
  //drawerMode: 'side' | 'over';
 stringArray: Array<string> = new Array("apple", "banana", "cherry");
  powerData?: powerModel[];
  constructor(private _service: PowerService){}
 
  ngOnInit(): void {
    this._service.getPowers().subscribe(op=>{
      this.powerData =op.body ?op.body:[]
     console.log('Op',op.body)
     console.log('Client Data',this.powerData)
      //console.log('power Data',this.powerData)
     
     
     });
  }

}
