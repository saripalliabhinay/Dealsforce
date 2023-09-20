import { api, LightningElement, wire } from 'lwc';
import { APPLICATION_SCOPE,createMessageContext, MessageContext, publish, releaseMessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import COUNTUPDATED from '@salesforce/messageChannel/Count_Updated__c';
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */
export default class LmsPractice extends LightningElement {

    @api counter=0;
    @api enteredInput;

    @wire(MessageContext)
    messageContext;
    
    incrementCounter(){
        this.counter=this.counter+this.enteredInput;
        const payload = { constant: this.counter };
        publish(this.messageContext, COUNTUPDATED, payload);
    }

    handleChange(event){
        this.enteredInput=event.target.value;
    }


}