import { api, LightningElement, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_NUMBER from '@salesforce/schema/Account.AccountNumber';

const FIELDS = [ACCOUNT_NAME, ACCOUNT_NUMBER];

export default class RecordApiExample extends LightningElement {

    @api recordId;
    @api objectApiName;
    
    connectedCallback(){
        console.log('nameField###',ACCOUNT_NAME);
    }

    @wire(getRecord, {recordId : '$recordId',fields : FIELDS, 
    modes :['Edit','View']})
    recordInfo(result){
        if(result.data){
            console.log('RecordApidataINFO###',result.data)
        }
        if(result.error){

        }
    }

    @wire(getRecord, {recordId : '$recordId',layoutTypes : ['Full','Compact'], 
    modes :['Edit','View']})
    recordDetails;

    get name(){
        console.log('name###',getFieldValue(this.recordDetails.data, ACCOUNT_NAME));
        return getFieldValue(this.recordDetails.data, ACCOUNT_NAME);
    }

    get accNumber(){
        return getFieldValue(this,this.recordDetails.data,'Account.AccountNumber')
    }
}