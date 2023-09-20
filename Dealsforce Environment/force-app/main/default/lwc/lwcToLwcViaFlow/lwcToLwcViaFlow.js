import { api, LightningElement } from 'lwc';

export default class LwcToLwcViaFlow extends LightningElement {
    @api colorCode;

    get colorValue(){
        return 'color :'+this.colorCode;
    }
}