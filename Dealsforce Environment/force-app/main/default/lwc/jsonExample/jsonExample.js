import { LightningElement } from 'lwc';
const columns = [
    {label:'Country Info' , fieldName : 'country', editable:true},
    {label:'State Info',fieldName : 'state',editable:true}
]
const COUNTRY_INFO =[
        {
            country :'America',
            state : 'San Fransisco'
        },
        {
            country :'Australia',
            state : 'Syndey'
        },
        {
            country :'India',
            state : 'Delhi'
        },

]
export default class JsonExample extends LightningElement {
     contryRelatedInfo = COUNTRY_INFO;
     columdsInfo= columns;
}