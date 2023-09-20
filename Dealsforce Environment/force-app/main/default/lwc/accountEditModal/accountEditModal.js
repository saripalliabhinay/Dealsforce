import { api, LightningElement } from 'lwc';
import LightningModal from 'lightning/modal'
export default class AccountEditModal extends LightningModal {
    @api info = {
        Name : '',
        Industry : '',
        Rating : '',
        Active__c : ''
    }

    handleSave(event){
        this.close('Okay')
    }
}