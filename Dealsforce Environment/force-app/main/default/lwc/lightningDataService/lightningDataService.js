import { LightningElement ,api , track } from 'lwc';
import CONTACT_FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LASTNAME from '@salesforce/schema/Contact.LastName';
import ShowToastEvent from 'lightning/platformShowToastEvent';
export default class LightningDataService extends LightningElement {
   @api recordId;
   @api objectApiName;
   firstName = CONTACT_FIRSTNAME;
   lastName = CONTACT_LASTNAME;
   value;
   age;
   @track properties = {
       isView : false,
       isEdit : false,
       isBoth : false,
       isCustom : false
   }

   get radioOptions(){
       return [
           {lable:'View', value:'isView'},
           {label:'Edit', value:'isEdit'},
           {label:'Both', value:'isBoth'},
           {label:'Custom',value:'isCustom'}
       ];
   }

   handleInputChange(event){
      /* let inputInfo=this.template.querySelectorAll('lightning-input')[0];
       if(inputInfo['name']=='name'){
           if(inputInfo['value'].includes('INTEGER')){
               inputInfo.setCustomValidity('Should not contains INTEGER');
           }
       }
       inputInfo.reportValidity();
       */
       this.template.querySelectorAll('lightning-input').forEach((x)=>{
           if(x['name']=='name'){
                if(x['value'].includes('INTEGER')){
                    x.setCustomValidity('Name does not contains Integer');
                }else{
                    x.setCustomValidity('');
                }
           }
           if(x['name']=='age'){
               if(x['value']<18){
                   x.setCustomValidity('Age should not be less than 18')
               }else{
                   x.setCustomValidity('');
               }
           }
           x.reportValidity();
       })
   }

   handleChange(event){
       this.properties[event.target.value]=true;
       Object.keys(this.properties).forEach((x)=>{
           if(x!= event.target.value){
            this.properties[x]=false;
            }
        })
   }

   handleCancel(event){
    event.preventDefault();
      let allFields = this.template.querySelectorAll('lightning-input-field');
      allFields.forEach((eachField)=>{
          eachField.reset();
      })
   }

   handleSuccess(event){
       this.dispatchEvent(new ShowToastEvent({
            message: 'Succesfully Updated',
            title: 'success',
            variant: 'success'
       }));
   }

   handleLoad(event){
      /*let allFiedls= tihs.template.querySelectorAll('lightning-input-field');
      allFields.forEach((eachEle)=>{
          if(eachEle['field-name']==this.firstName){
                    eachEle['value']='Test Info';
          }
      }) */
   }

   handleSubmit(event){

   }

}