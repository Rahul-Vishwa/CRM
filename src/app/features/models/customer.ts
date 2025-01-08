export interface Customer{
    name:string,
    type:string,
    status:string,
    emailAddress:string,
    phoneNumber:number,
    notes?:string
}

export interface AllCustomers{
    id:number,
    name:string,
    type:string,
    status:string,
    emailaddress:string,
    phonenumber:number,
    notes?:string,
    createdby:string,
    createdat:string
}