import { LightningElement } from 'lwc';

export default class HooksExample extends LightningElement {
    propName='Test Hooks';
    constructor(){
        console.log('Inside Constructor');
        super();
    }

    get name(){
        console.log('Inside Getter');
        return this.propName;
    }

    set name(value){
        console.log('Insider Getter');
        this.propName=value;
    }

    connectedCallback(){
        console.log('Inside Connected Call bak');
    }

    disconnectedCallback(){
        console.log('Inside dis Connected callback');
    }

    renderedCallback(){
        console.log('Inside render Calback');
    }

    errorCallback(error,stack){

    }
}