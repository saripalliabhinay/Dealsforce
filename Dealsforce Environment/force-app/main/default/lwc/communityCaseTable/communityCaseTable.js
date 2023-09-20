import { LightningElement, wire } from 'lwc';
import fetchCases from '@salesforce/apex/AccountAccessor.fetchCases';
import {NavigationMixin} from "lightning/navigation";
export default class CommunityCaseTable extends NavigationMixin(LightningElement) {

    caseData=[];
    erroinfo
    @wire(fetchCases)
    caseInfo(result){
        if(result.data){
            console.info('data###',result.data);
            this.caseData= result.data;
        }
        if(result.error){
            console.info('error###',result.error);
            this.erroinfo= result.error;
        }
    }

    handleRowClick(event){
        console.log('calling on Row click###');
        
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                actionName: "view",
                recordId: event.currentTarget.dataset.id,
                objectApiName: "Case"
            }
        });
    }
}