import { api, LightningElement, wire } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi'
export default class HeadLessQuickAction extends NavigationMixin(LightningElement) {

    @api recordId;
    @api contactsInfo; 
    
    @api invoke(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                actionName: "edit",
                recordId: this.recordId,
                objectApiName: "Contact"
            }
        });
    }
}