import { api, LightningElement } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name'
export default class DisplayDetail extends LightningElement {
    @api eachRecordInfo;
    @api relatedObjectName;
    @api relatedFields;
    nameField = NAME_FIELD;

    get topFields(){
        return this.relatedFields.split(',').slice(0,5);
    }

}