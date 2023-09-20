import { api, LightningElement } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LASTNAME from '@salesforce/schema/Contact.LastName';
import CONTACT_ACCOUNTID from '@salesforce/schema/Contact.AccountId';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class LwcAsQuickAction extends LightningElement {
    @api info='Test Info';
    @api recordId;
    createdContactId;
    objectName = CONTACT_OBJECT.objectApiName;

    get objectInfo(){
        console.info('objectName###',objectName);
    }
    setInfo(info){
        this.info=info;
    }

    handleSuccess(event){
        alert(event.detail.Id);
        this.createdContactId=event.detail.id;
        this.dispatchEvent(
            new ShowToastEvent({
                title : 'Success',
                message : 'Record created Succesfully!!!',
                variant :'success'
            })
        );
        
    }

    handleCancel(event){
        this.disconnectedCallback(new CloseActionScreenEvent());
    }

}