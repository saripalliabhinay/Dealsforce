import { LightningElement } from 'lwc';

export default class ParentExample extends LightningElement {

    enterNoOfPersons;

    callOnChange(event){
        console.log('enteredAge',event.detail);
    }

    handleBubblePass(event){
        console.log('info', event.target.bubbleInfo);
    }

    callOnPersonChange(event){
        this.enterNoOfPersons=event.target.value;
        console.log('info###',this.enterNoOfPersons);
    }
}