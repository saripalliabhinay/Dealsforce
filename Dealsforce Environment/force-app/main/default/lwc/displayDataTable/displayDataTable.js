import { api, LightningElement } from 'lwc';

export default class DisplayDataTable extends LightningElement {

    @api relatedRecords;
    @api relatedLabelWithFields;
    
    get columnsInfo(){
        return this.relatedLabelWithFields.slice(0,5)
    }
}