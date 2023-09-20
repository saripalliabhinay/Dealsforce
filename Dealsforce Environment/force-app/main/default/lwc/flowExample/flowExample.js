import { api, LightningElement } from 'lwc';
import fetchAccountImperative from '@salesforce/apex/AccountAccessor.fetchAccountWired';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';
export default class FlowExample extends LightningElement {

    inputData;
    @api industry;
    @api inputToFlow;
    connectedCallback(){
       /* fetchAccountImperative({industry:this.industry})
        .then((result)=>{
            console.info('flowresult###',result);
            this.inputToFlow=[
                {
                    name:'lstAccounts',
                    type:'sObject',
                    value: result
                },
                {
                    name:'firstName',
                    type:'String',
                    value: 'Abhinay'
                },
                {
                    name:'lastName',
                    type:'String',
                    value:'Dhoni'
                }
            ];
        })
        .catch((error)=>{
            console.info('flowerror###',error);
        })*/
    }

    async handleChange(event){
        let target = event.target;
       const response= await fetchAccountImperative({industry:event.target.value});
       this.dispatchEvent(new FlowAttributeChangeEvent('industry', target.value));
       console.info('flowresponse###',response);
        this.inputToFlow=[
            {
                name:'lstAccounts',
                type:'sObject',
                value: result
            },
            {
                name:'firstName',
                type:'String',
                value: 'Abhinay'
            },
            {
                name:'lastName',
                type:'String',
                value:'Dhoni'
            }
        ];

    }

   

}