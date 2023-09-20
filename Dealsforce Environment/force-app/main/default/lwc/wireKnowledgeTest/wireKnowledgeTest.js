import { api, LightningElement, track, wire } from 'lwc';
import fetchAccountWiredWithoutParam from '@salesforce/apex/AccountAccessor.fetchAccountWiredWithoutParam';
import fetchAccountWired from '@salesforce/apex/AccountAccessor.fetchAccountWired';
import refreshApex from '@salesforce/apex';
import { getObjectInfo  } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import { NavigationMixin, CurrentPageReference } from 'lightning/navigation';
export default class WireKnowledgeTest extends LightningElement {

    @api counter;
 
    @wire(CurrentPageReference) pageRef;

    constructor(){
        super();
        console.log('pageRef@@@', this.pageRef);
    }

    @wire(getObjectInfo,{objectApiName : ACCOUNT_OBJECT})
    objectDetals(result){
        if(result.data){
            console.log('objectDetails###',result.data);
        }
        if(result.error){

        }
    }

    industryInfo;
    @track industryDetailsForRefresh=[];
    @track generalInfo=[];
    @wire(fetchAccountWiredWithoutParam) fetchData(result){
        this.generalInfo=result;
        if(result.data){
            console.info('data###',result.data);
        }
        if(result.error){

        }
    }

    @wire(fetchAccountWired,{'industry':'$industryInfo'}) fetchIndustryData(industryDetails){
        this.industryDetailsForRefresh=industryDetails;
        let data= industryDetails.data;
        let error=industryDetails.error;
        if(data){
            console.info('industryData###',data);
        }
        if(error){
            console.error('error###',error);
        }
    }

    valueChangeHandler(event){
        console.info('changed@##',event.target.value);
        this.industryInfo=event.target.value;
    }

    doRefresh(event){
        refreshApex(this.generalInfo);
    }
}