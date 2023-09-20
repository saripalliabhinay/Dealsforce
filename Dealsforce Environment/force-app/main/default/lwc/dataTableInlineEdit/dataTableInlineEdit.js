import { api, LightningElement, wire  } from 'lwc';
import gatherContacts from '@salesforce/apex/AccountAccessor.gatherContacts';
import CONTACT from '@salesforce/schema/Contact';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import { updateRecord } from 'lightning/uiRecordApi';
import ShowToastEvent from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import ACCOUNTWITHCASES from '@salesforce/apex/AccountAccessor.accountWithCases';
import accountEditModal from 'c/accountEditModal';
const COLUMNS = [
    {label : 'First Name', fieldName: FIRST_NAME.fieldApiName, editable:true},
    {label : 'Last Name', fieldName: LAST_NAME.fieldApiName,editable:true}
];
const actions = [{ label: "Edit", name: "edit_record" }];
const ACCOUNTSWITHCASESCOLUMNS = [
    {
        label:"Account Name",
        fieldName : "Name"
    },
    {
        label : "Case Nmber",
        fieldName :"Priority",
        cellAttributes: {
            iconName: { fieldName: "iconName" },
        },
    },
    {
        type: "action",
        label: "Edit Record",
        typeAttributes: {
            rowActions: actions,
            menuAlignment: "right",
        },
    }
]
export default class DataTableInlineEdit extends LightningElement {

    @api info='4123213';
    @api recordId;
    columnInfo = COLUMNS;
    columsWithCasesInfo = ACCOUNTSWITHCASESCOLUMNS
    conRecords;
    conError;
    allConResult;
    inlineDraft=[];

    connectedCallback(){
        console.log('fieldApiName#@@', FIRST_NAME.fieldApiName);
    }
 
    multileLevelAccountWithCases;
    accountsForEdit;
    @wire(ACCOUNTWITHCASES)
    wiredAccountWithCases({data,error}){
        if(data){
        console.info('data###',data);
           let records =JSON.parse(JSON.stringify(data));
           this.accountsForEdit=data;
           let result = records.map((record)=>{
               if(record['Cases']){
                   record['_children']= record.Cases;
                   delete record.Cases;
                   let iconKey = "iconName";
                   record[iconKey] = "standard:case";
               }
               return record;
           });
            this.multileLevelAccountWithCases=result;
        }
        if(error){
            console.info('error###',error);
        }
    }

    @wire(gatherContacts,{'accId': '$recordId'})
    relatedContacts(info){
        this.allConResult=info;

        if(info.data){
            console.info('conRecords@@@',info.data);
            this.conRecords=info.data;
            this.conError=undefined;
        }
        if(info.error){
            console.log('error###',info.error);
            this.conError=info.error;
            this.conRecords=undefined;
        }
    }

    async handleSave(event){
        let info=event.detail.draftValues;
        let result= info.map((eachInfo)=>{
            let fields =Object.assign({},eachInfo);
            return {fields};
        });

        const updateAllRecords= result.map((x)=>{updateRecord(x)});
        await Promise.all(updateAllRecords); 
        this.dispatchEvent(new ShowToastEvent({
               message :'success',
               title:'success',
               variant:'success'
            }
        )
        );
        await refreshApex(this.allConResult);
    }

    async handleRowAction(event){
        let rowInfo = event.detail.row;
        let filteredResult=this.accountsForEdit.filter((x)=>{return x.Id==rowInfo.Id});
        console.log('filteredResult###'+filteredResult[0]);
        let result = await accountEditModal.open({
            info : {
                Name : rowInfo.Name,
                Active__c : filteredResult[0].Active__c,
                Rating : filteredResult[0].Rating,
                Industry : filteredResult[0].Industry
            },
            size : 'large',
            disableClose : false
        })
        console.log('result###',result);
        
    }
}