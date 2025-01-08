import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { AllCustomers } from "../models/customer";
import { Pagination } from "../../shared/models/common";

export const CustomerActions=createActionGroup({
    source:'Customers',
    events:{
        'Load Customers':emptyProps(),
        'Get Customers':props<{customers:AllCustomers[], totalRecords:Readonly<number>}>(),
        'Set Pagination':props<Pagination>(),
    }
});