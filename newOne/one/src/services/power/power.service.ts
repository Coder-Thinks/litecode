import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { powerModel } from '../../Models/powerModel';
import { countryModel } from '../../Models/countryModel';
import { stateModel } from '../../Models/StateModel';
import { cityModel } from '../../Models/CityModel';

@Injectable({
  providedIn: 'root',
})
export class PowerService {
  url = "https://localhost:7215";
  controller = 'Powers';

  constructor(private _httpClient: HttpClient) {}

  public createPower(id: powerModel): Observable<HttpResponse<powerModel>> {
    return this._httpClient.post<powerModel>(
      `${this.url}/${this.controller}/${id}`,
      id,
      { observe: 'response' }
    );
  }
  public updatePower(id: powerModel): Observable<HttpResponse<powerModel>> {
    return this._httpClient.patch<powerModel>(
      `${this.url}/${this.controller}/${id}`,
      id,
      { observe: 'response' }
    );
  }
  public powerDelete(id: number): Observable<HttpResponse<number>> {
    return this._httpClient.delete<number>(`${this.url}/${this.controller}/${id}`, {
      observe: 'response',
    });
  }

  public getPowerById(id: number): Observable<HttpResponse<powerModel>> {
    return this._httpClient.get<powerModel>(`${this.url}/${this.controller}/${id}`, {
      observe: 'response',
    });
  }
  public getPowers(): Observable<HttpResponse<powerModel[]>> {
    return this._httpClient.get<powerModel[]>(`${this.url}/${this.controller}/`, {
      observe: 'response',
    });
  }
  public getCountries(): Observable<HttpResponse<countryModel[]>> {
    return this._httpClient.get<countryModel[]>(`${this.url}/${this.controller}/countries/`, {
      observe: 'response',
    });
  }
  public getStates(id:number): Observable<HttpResponse<stateModel[]>> {
    return this._httpClient.get<stateModel[]>(`${this.url}/${this.controller}/states/${id}`, {
      observe: 'response',
    });
  }
  public getCities(id:number): Observable<HttpResponse<cityModel[]>> {
    return this._httpClient.get<cityModel[]>(`${this.url}/${this.controller}/cities/${id}`, {
      observe: 'response',
    });
  }
}
