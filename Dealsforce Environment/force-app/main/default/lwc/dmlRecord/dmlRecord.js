import { api, LightningElement, track, wire } from 'lwc';
import { createRecord, deleteRecord, RecordFieldDataType, updateRecord } from 'lightning/uiRecordApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import { refreshApex } from '@salesforce/apex';
import fetchAccountWiredWithoutParam from '@salesforce/apex/AccountAccessor.fetchAccountWiredWithoutParam';
import fetchRecords from '@salesforce/apex/AccountAccessor.fetchRecords';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin , CurrentPageReference } from 'lightning/navigation';
import { encodeDefaultFieldValues, decodeDefaultFieldValues } from 'lightning/pageReferenceUtils';
import labelInfo from '@salesforce/label/c.LWC_Label';
import displayImage from '@salesforce/resourceUrl/Image';
import SFStaticResource from '@salesforce/resourceUrl/SFStaticResource';
import SFCSS from '@salesforce/resourceUrl/CSS';
import { loadStyle } from 'lightning/platformResourceLoader';
const columns = [
    {label:'Name', fieldName:'Name'},
    {label:'Industry', fieldName : 'Industry' }
];

export default class DmlRecord extends NavigationMixin(LightningElement) {
    
    @track styleInfo = SFStaticResource+'/SFCss.css';
    constructor(){
        super();
    }

    connectedCallback(){
        /*loadStyle(this,SFStaticResource+'/SFCss')
        .then((result)=>{
             console.log('result###',result);
        })
        .catch((error)=>{
          console.log('error###',error);
        });

        loadStyle(this, SFCSS)
        .then((result)=>{
           console.info('result###',result);
        })
        .catch((error)=>{
            console.info('error###',error)
        })
        */
        Promise.all(
            loadStyle(this,SFStaticResource+'/SFCss'),
            loadStyle(this, SFCSS)
        )
        .then((result)=>{

        })
        .catch((error)=>{

        })
    }

    @track labelData = labelInfo;
    imageToLoad = displayImage;
    @api recordId;
    accountResult=undefined;
    accountLst=[];
    @api title;
    @api targetObject;
    columns=columns;
    selectedRecord=undefined;
    relatedFields=[];
    relatedId;
    @wire(CurrentPageReference)
    getURLParameters(pageRefInfo){
        if(pageRefInfo){
            this.relatedId=pageRefInfo.state?.Id;
        }
    }

    navigateToContactWithDefault(){
        let defaultValues = {
            FirstName : 'Abhinay',
            LastName : 'Default'
        }
        let encodedValues = encodeDefaultFieldValues(defaultValues);
        let decodedValue = decodeDefaultFieldValues(encodedValues);
        
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                actionName: "new",
                objectApiName: "Contact"
            },
            state : {
                defaultFieldValues : encodedValues
            }
        });
    }
    @wire(fetchAccountWiredWithoutParam) 
    wiredInfo(result){
        this.accountResult=result;
        if(result.data){
            this.accountLst=result.data;
        }
    }

    @wire(getObjectInfo, { objectApiName : '$targetObject' })
    relatedObjectInfo(result){
        if(result.data){
           console.log('relatedObjectInfo###',result.data);
           let info= Object.keys(result.data.fields);
           this.relatedFields=info.join(',')
        }
    }

    @wire(fetchRecords,{targetObject: '$targetObject', targetFields : '$relatedFields'})
    relatedRecordsInfo(result){
        if(result.data){
             console.log('relatedRecord###',result.data);
        }
        if(result.error){
            console.log('relatedError###',result.error);
        }
    }



    handleSelectedRow(event){
        if(event.detail.selectedRows.length>0){
            this.selectedRecord=event.detail.selectedRows[0].Id;
        }
    }

    deleteSelectedRecord(event){
        deleteRecord(this.selectedRecord)
        .then((result)=>{
            refreshApex(this.accountResult);
        })
        .catch((error)=>{

        })
    }

    updateSelectedRecord(event){
        const fields={};
        fields['Id']= this.selectedRecord;
        fields['Industry']='Chemicals';
        updateRecord({fields})
        .then((result)=>{
            console.log('result###',result);
             this.dispatchEvent( new ShowToastEvent({
                 message : 'Success',
                 title : 'Record updated Successfully!!',
                 variant : 'success'
             }))
             refreshApex(this.accountResult);
        })
        .catch((error)=>{
              console.log('error###',error);
        })
    }
    
    redirectToHomePage(){
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                actionName: "home",
                objectApiName: 'Account'
            }
        });
    }

    redicetToDetailPage(){
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                actionName: "view",
                recordId: this.selectedRecord,
                objectApiName: 'Account'
            }
        });
    }

    rediectToOtherComponent(){
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: "c__navigation",
                actionName : "view"
            },
            state : {
                c__counter : "10"
            }
        });
    }

    redirectWithGenerateUrl(){
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__component',
            attributes: {
                componentName: "c__navigation",
            }, 
            state : {
                c__counter : "10"
            }
        }).then((result)=>{
            let generatedUrl = result;
            console.log('generateUrl###',generatedUrl);
        })
    }

    createRecordWithLDS(event){
        let fields = {};
        fields['Name']='Test from LWC Create Record Direct';
        createRecord({apiName : ACCOUNT_OBJECT.objectApiName, fields : fields })
        .then((result)=>{
            console.log('result@##',result);
        })
        .catch((error)=>{
            console.log('error###',error);
        })
    }

    updateUsingLDS(event){
        const fields = {};
        fields['Name']='Updated from LWC Update';
        fields['Id']= this.recordId;
        updateRecord({fields})
        .then((result)=>{
          console.log('updated####',result);
        })
        .catch((error)=>{
              console.log('error###',error);
        })
    }


    deleteUsingLDS(event){
        deleteRecord( this.recordId)
        .then((result)=>{

        })
        .catch((error)=>{

        })
    }
}