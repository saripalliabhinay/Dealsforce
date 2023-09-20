import { LightningElement, api } from 'lwc';

export default class FormFactorFlexiPageRegions extends LightningElement {

    @api flexipageRegionWidth;

    get detailCass(){
        console.log('elementDom###', this.flexipageRegionWidth);
        return this.flexipageRegionWidth;
    }
}