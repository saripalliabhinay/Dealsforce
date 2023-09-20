import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { APPLICATION_SCOPE,createMessageContext, MessageContext, publish, releaseMessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import lmsExmple from '@salesforce/messageChannel/lmsExample__c';

/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */
const info = [
    { label: 'Account' , value :'Account'},
    {label: 'Contact', value:'Contact'}
]
export default class SelectorComponent extends LightningElement {

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        let info=this.template.querySelector('p');
        console.info('insideConnectedCallback###',info);
    }

    renderedCallback(){
        let info=this.template.querySelector('p');
        console.info('insideRenderCallback###',info);
    }

    @track combBoxValues = info;
    selectedValue;
    subscription=null;
    handleChange(event){
       this.selectedValue= event.target.value;
       this.dispatchEvent(new CustomEvent('select',{detail : { 'pickedValue': this.selectedValue}}));

       const payload = { selectedObject: this.selectedValue };
       publish(this.messageContext, lmsExmple, payload);
    }

    
}