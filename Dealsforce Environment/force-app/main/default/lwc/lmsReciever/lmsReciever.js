import { LightningElement, api, wire } from 'lwc';
import { APPLICATION_SCOPE,createMessageContext, MessageContext, publish, releaseMessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import COUNTUPDATED from '@salesforce/messageChannel/Count_Updated__c';
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */

export default class LmsReciever extends LightningElement {

    @api lmsRecieved;
    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        if(!this.subscription){
            this.subscription = subscribe(this.messageContext, COUNTUPDATED,
                (result) => {
                    console.log(result);
                    this.handleIncrement(result);
                }/* ,{ scope: APPLICATION_SCOPE }*/
            );
        }
    }

    handleIncrement(result){
        console.log('counter###',result.constant);
        this.lmsRecieved=result.constant;
    }
}