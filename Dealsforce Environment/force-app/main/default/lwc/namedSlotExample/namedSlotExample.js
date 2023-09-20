import { LightningElement } from 'lwc';

export default class NamedSlotExample extends LightningElement {
    handleSlotChange(){
        console.log('calling on solt chagne');
    }
}