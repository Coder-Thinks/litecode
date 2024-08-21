import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PowerService } from '../../services/power/power.service';
import { powerModel } from '../../Models/powerModel';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { countryModel } from '../../Models/countryModel';
import { stateModel } from '../../Models/StateModel';
import { cityModel } from '../../Models/CityModel';
import { Subject, takeUntil } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-client-date',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  templateUrl: './client-date.component.html',
  styleUrl: './client-date.component.css',
})
export class ClientDateComponent implements OnInit, OnDestroy {
  clientForm: any;
  id?: number;
  clientmodel = new powerModel();
  fileName?: string;
  countries?: countryModel[];
  states?: stateModel[];
  cities?: cityModel[];
  // Unsbscribe
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _formbuilder: FormBuilder,
    private _activateRoute: ActivatedRoute,
    private _powerService: PowerService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe((param: Params) => {
      this.id = param['get']('id');
    });

    this.clientForm = this._formbuilder.group({
      powerId: [0],
      powerName: ['', Validators.required],
      cityId: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
      fileUpload: ['', Validators.required],
      dOB: ['', Validators.required],
      gender: ['', Validators.required],
      panNo: ['', Validators.required],
    });

    this._powerService
      .getCountries()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((op) => (this.countries = op.body ? op.body : []));

    if (this.id !== undefined) {
      this._powerService
        .getPowerById(this.id)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((op) => {
          this.clientmodel = op.body ? op.body : this.clientmodel;
          this.clientForm.patchValue(this.clientmodel, {
            emitEvent: false,
          });
          if (this.clientmodel?.stateId !== undefined) {
            this.getStates(this.clientmodel?.stateId);
          }
          if (this.clientmodel?.cityId !== undefined) {
            this.getCities(this.clientmodel?.cityId);
          }
        });
    }

    this.clientForm
      .get('countryId')
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((countryId: any) => {
        if (countryId !== null && countryId !== undefined) {
          this.getStates(countryId);
        }
      });
    this.clientForm
      .get('stateId')
      .valueChanges.pipe(takeUntil(this._unsubscribeAll))
      .subscribe((stateId: any) => {
        if (stateId !== null && stateId !== undefined) {
          this.getCities(stateId);
          alert(stateId);
        }
      });
  }
  /**
   * file event
   */
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = file.name;
      this.clientForm.patchValue({
        fileUpload: file,
      });

      this.clientForm.get('fileUpload').set(file);
    }
  }
  /**
   * get States
   */

  getStates(id: number) {
    this._powerService
      .getStates(id)
      .subscribe((op) => (this.states = op.body ? op.body : []));
  }
  /**
   * get Cities
   */

  getCities(id: number) {
    this._powerService
      .getCities(id)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((op) => (this.cities = op.body ? op.body : []));
  }
  /**
   * Add Cliend
   */
  addPower(power: powerModel) {
    this._powerService
      .createPower(power)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe( {
        next: (response) => {
          console.log('Response:', response);

          if (response.status === 200) {
              alert(' successfully Updated');
              this._router.navigate(['./']);
              
          }
      },
      error: (error) => {
        this._router.navigate(['./']);
          alert('Something Wrong');
          console.error('Error:', error);
          
      },
      });
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
