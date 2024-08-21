import { cityModel } from "./CityModel";
import { countryModel } from "./countryModel";
import { stateModel } from "./StateModel";

export class powerModel{
    powerId?:number;
    powerName="";
    dOB?:Date;
    gender=""
    panNo="";
    countryId?:number;
    stateId?:number;
    cityId?:number;
    state?:stateModel;
    city?:cityModel;
    country?:countryModel;
    states?:stateModel[];
    cities?:cityModel[];
    countries?:countryModel[];


}