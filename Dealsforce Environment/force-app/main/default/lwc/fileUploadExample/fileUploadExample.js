import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class FileUploadExample extends LightningElement {
    @api recordId;
    get acceptedFormats(){
        return ['.pdf','.jpg','.png' ];
    }

    get myRecordId(){
        return this.recordId;
    }

    handleUploadFinished(event){
        console.log('insertedFile###',event.detail.files);
        this.dispatchEvent(new ShowToastEvent({
            title: 'title',
            message: 'message',
            variant: 'success'
        }));
    }
}