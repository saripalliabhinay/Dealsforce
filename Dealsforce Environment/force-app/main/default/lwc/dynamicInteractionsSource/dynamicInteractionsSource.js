import { api, LightningElement, wire } from 'lwc';
import fetchAccountWired from '@salesforce/apex/AccountAccessor.fetchAccountWired';
const COLUMNS = [
    { type:'text', label:'Name', fieldName:'Name'},
    {type: 'text', label:'Industry', fieldName:'Industry'}
]
export default class DynamicInteractionsSource extends LightningElement {

    @api industry;
    @api recId;
    indData;
    colInfo= COLUMNS;
    @wire(fetchAccountWired,{industry:'$industry'})
    industryBasedInfo(info){
        if(info.data){
            console.info('data####',info.data);
            this.indData=info.data;
        }
        if(info.error){
            console.info('errror###',error);
        }
    }
    handleChange(event){
        this.industry=event.target.value;
    }

    handleRowSelection(event){
        let selectedRow=event.detail.selectedRows;
        this.recId = selectedRow[0].Id;
        this.dispatchEvent(new CustomEvent('itemSelected',{
            detail : {
                recId : this.recId
            }
        }))
    }
}