import { createFeatureSelector } from "@ngrx/store";
import { AllCustomers } from "../models/customer";
import { Pagination } from "../../shared/models/common";

export const selectCustomers=createFeatureSelector<{customers:AllCustomers[], totalRecords:number}>('customers');
export const selectPagination=createFeatureSelector<Pagination>('pagination');