import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CustomerService } from "../services/customer.service";
import { CustomerActions } from "./customers.action";
import { catchError, EMPTY, exhaustMap, map, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";
import { selectPagination } from "./customers.selectors";

@Injectable()
export class CustomersEffect{
    private actions$=inject(Actions);
    private customerService=inject(CustomerService);
    private store=inject(Store);

    addCustomers$=createEffect(()=>
        this.actions$.pipe(
            ofType(CustomerActions.loadCustomers),
            withLatestFrom(
                this.store.select(selectPagination)
            ),
            exhaustMap(([action, pagination])=>
                this.customerService.getCustomers(
                    pagination
                ).pipe(
                    map(customers=>CustomerActions.getCustomers({
                        customers:customers.customers,
                        totalRecords:customers.totalRecords
                    })),
                    catchError(()=>EMPTY)
                )
            )
        )
    );
}