import { createReducer, on } from "@ngrx/store";
import { AllCustomers } from "../models/customer";
import { CustomerActions } from "./customers.action";
import { Pagination } from "../../shared/models/common";

export const initialState:{customers:AllCustomers[], totalRecords:number}={customers:[], totalRecords:0};
export const initialPageSize:Pagination={
    page:1,
    pagesize:10,
    searchterm:null
};

export const customersReducer=createReducer(
    initialState,
    on(CustomerActions.getCustomers, (_state, {customers, totalRecords})=>({
        customers,
        totalRecords
    })),
);

export const paginationReducer=createReducer(
    initialPageSize,
    on(CustomerActions.setPagination, (_state, {page, pagesize, searchterm})=>({
        page, 
        pagesize, 
        searchterm
    }))
);