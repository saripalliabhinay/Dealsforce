import { api, LightningElement, wire } from 'lwc';
import  updateAccount from '@salesforce/apex/AccountAccessor.updateAccount';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_RATING from '@salesforce/schema/Account.Rating';
import ACCOUNT_INDUSTRY from '@salesforce/schema/Account.Industry';
import ACCOUNT_ACTIVE from '@salesforce/schema/Account.Active__c';
import { getRecord , notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

const FIELDS = [ ACCOUNT_NAME , ACCOUNT_RATING , ACCOUNT_INDUSTRY , ACCOUNT_ACTIVE ];
export default class UpdateAvailable extends LightningElement {
  
    info={};

    @api recordId;
    @api objectApiName;
    recordInfo;
    fieldsInfo = FIELDS;
    @wire(getRecord,{recordId : '$recordId',fields : FIELDS})
    fetchedInfo(info){
        this.recordInfo=[];
        this.recordInfo=info;
        if(info.data){
            console.info('data###',info.data);
        }
        if(info.error){

        }
    }

    handleChange(event){
        let fieldInfo=event.target.fieldName;
        this.info[fieldInfo]=event.target.value;
    }

    populateInfo(event){
        
    }

    async handleManualSave(event){
        this.info['Rating']='Hot';
        let result= await updateAccount({'accountId': this.recordId,'info':JSON.stringify(this.info)});
        console.log('result#@##',result);
        if(result){
            await notifyRecordUpdateAvailable([{recordId:this.recordId}]);
            console.log('responded###');
            await refreshApex(this.recordInfo);
            console.log('refreshCalled###');
        }
    }



}