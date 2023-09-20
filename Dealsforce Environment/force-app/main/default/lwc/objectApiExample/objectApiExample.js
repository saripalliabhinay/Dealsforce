import { api, LightningElement, wire } from 'lwc';
import { getObjectInfo , getPicklistValues, getPicklistValuesByRecordType } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import COUNTRY_FIELD from '@salesforce/schema/Lead.Country';
export default class ObjectApiExample extends LightningElement {

    @api objectApiName='Contact';
    defaultRecordTypeId='';
    picklistFields=[];
    selectedPickList;
    isLoaded=false;
    isPopulated=false;
    connectedCallback(){
        console.log('Account Object####', ACCOUNT_OBJECT);
      //  console.log('info###', this.objectApiName);
    }
    @wire(getObjectInfo, { objectApiName :'$objectApiName'})
    fetchedObject(result){
        if(result.data){
            console.log('objectInfo###',result.data);
            this.defaultRecordTypeId= result.data.defaultRecordTypeId;
            this.fetchPicklistFields(result.data);
        }
        if(result.error){

        }
    }

    fetchPicklistFields(info){
        Object.keys(info.fields).forEach(
            (x)=>{
                 if(info.fields[x]['dataType']=='Picklist'){
                     console.log('picklistField', x);
                     this.picklistFields.push({label: x, value: x});
                }  
            }
        );
        this.isLoaded=true;
    }

    handleChange(event){
      this.selectedPickList =event.detail.value;
      this.isPopulated=true;
    }

    @wire(getPicklistValues, {fieldApiName:'$selectedPickList', recordTypeId: '$defaultRecordTypeId'})
    fetchedPickLists;

}