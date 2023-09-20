import { api, LightningElement } from 'lwc';

export default class ChildExample extends LightningElement {

    age;
    @api bubbleInfo;
    
    passPageSize(event){
        console.log('callingAtChild###',event.target.value);
        this.dispatchEvent(new CustomEvent('passage',{detail:event.target.value, bubbles:true}));
        this.callMeWithAwait();
        console.log('ageAfterAwait###',this.age);
    }

    handleChange(event){
        this.bubbleInfo=event.target.value;
    }


    bubblePassWithAPI(event){
        console.info('infoToPass###',this.bubbleInfo);
        this.dispatchEvent(new CustomEvent('bubblepass',{bubbles:true}));
    }

    async callMeWithAwait(){
        await setTimeout(function(){console.log('waiting...');this.age=99;},1000);
        
    }
}