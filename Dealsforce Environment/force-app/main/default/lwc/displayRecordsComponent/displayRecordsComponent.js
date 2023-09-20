import { LightningElement, track, wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import fetchRecords from '@salesforce/apex/AccountAccessor.fetchRecords';
import { APPLICATION_SCOPE,createMessageContext, MessageContext, publish, releaseMessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import lmsExample from '@salesforce/messageChannel/lmsExample__c';
/* https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_salesforce_modules */
export default class DisplayRecordsComponent extends LightningElement {
     @track selectedObject;
     @track relatedFields;
     @track relatedRecords;
     @track relatedLabelWithFields=[];
     isTableDisplay=false;
    subscription=null;

    @wire(MessageContext)
    messageContext;
    
    connectedCallback(){
      this.subscribeToLMS();
    }

    subscribeToLMS(){

        if(this.subscription){
            return null;
        }
        this.subscription = subscribe(this.messageContext, lmsExample,
            (result) => {
                console.log('result', result.selectedObject);
                this.selectedObject=result.selectedObject;
                //this.isTableDisplay=false;
            }/* ,{ scope: APPLICATION_SCOPE }*/
        );
    }

    disconnectedCallback(){
      this.unsubscribeToLMS();
    }

    unsubscribeToLMS(){
        unsubscribe(this.subscription);
         this.subscription = null;
    }



     @wire( getObjectInfo, {objectApiName: '$selectedObject'} )
     relatedObjectInfo(objectInfo){
         if(objectInfo.data){
            console.info('relatedData###',objectInfo.data);
           let info= Object.keys(objectInfo.data.fields);
           this.relatedFields=info.join(',');
           let labelWithName=[];
           /*objectInfo.data.fields.forEach((eachEle)=>{
               labelWithName.push({label:eachEle['label'], fieldName:eachEle});
           });*/
           this.relatedLabelWithFields=[];
           info.forEach((eachEle)=>{
            labelWithName.push({label:objectInfo.data.fields[eachEle]['label'], fieldName:eachEle});
           })
           this.relatedLabelWithFields.push(...labelWithName);
           this.isTableDisplay=true;
         }
         if(objectInfo.error){
            console.info('relatedError###',objectInfo.error);
         }
     };

    @wire(fetchRecords,{targetObject: '$selectedObject', targetFields : '$relatedFields'})
    relatedRecordsInfo(result){
        if(result.data){
             console.log('recordData###',result.data);
             let resultMap=result.data.map( (value) => {return {'Id': value.Id, 'Name': value.Name}});
             this.relatedRecords=resultMap;
             console.info('map###',resultMap);
        }
        if(result.error){
            console.log('recordError###',result.error);
        }
    }

     handleSelection(event){
         this.selectedObject = event.detail.pickedValue;
     }



}