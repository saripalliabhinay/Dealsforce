import { api, LightningElement } from 'lwc';

export default class LdsExample extends LightningElement {
    @api objectApiName;
    @api recordId;

    constructor(){
        super();
        console.info('objectName##',this.objectApiName);
        console.info('recordId##',this.recordId);
    }

    connectedCallback(){
        console.info('callbackobjectName##',this.objectApiName);
        console.info('callbackrecordId##',this.recordId);
    }
}