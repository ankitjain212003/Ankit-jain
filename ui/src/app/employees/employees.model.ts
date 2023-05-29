import { EVENT_MANAGER_PLUGINS } from "@angular/platform-browser";
import { RtlScrollAxisType } from "@angular/cdk/platform";
import { identifierName } from "@angular/compiler";
import { Directive } from "@angular/core";
import { exhaustMap } from "rxjs";

// TODO: Replace this with your own data model type
export interface Employ {
    designation: null | 'Engineer'| 'Lead' | 'Manager'| 'Director' | 'CEO';
    location: null | 'Delhi' | 'Mumbai' | 'Chennai' | 'Kolkatta';
    dateOfBirth: null | string;
    dob: null | Date;
    name: string;
    id: number;
}

