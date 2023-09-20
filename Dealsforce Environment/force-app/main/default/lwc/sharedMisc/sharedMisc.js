import { LightningElement } from 'lwc';
import { add, si } from './shared.js';
import { si2 } from 'c/utility';
export default class SharedMisc extends LightningElement {

    constructor(){
        super();
        const siInfo = si(1000,1,20);
        console.log('siInfo###'+siInfo);
        const siInfo2 = si2(1000,1,30);
        console.log('siInfo2###'+siInfo2);
    }

    amount;
    year;
    perc;

    handleChange(event){
        if(event.target.name=='amount'){
            this.amount=event.target.value;
        }
        if(event.target.name=='year'){
            this.year=event.target.value;
        }
        if(event.target.name=='perc'){
            this.perc=event.target.value;
        }
    }

    handleClick(event){
        let s=si(this.amount,this.year,this.perc);
        console.info('calculated Result##',s);

        let info=add(100,200);
        console.info('result##',info);
    }
}