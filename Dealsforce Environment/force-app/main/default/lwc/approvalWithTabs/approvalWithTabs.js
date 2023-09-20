import { LightningElement, api, wire } from 'lwc';
import fetchOnGoingProcess from '@salesforce/apex/LWCPractice.fetchOnGoingProcess';
const tabInfo= {
    'Account' : {
        label : 'Account', value :'Account'
    },
    'Contact' : {
        label : 'Contact', value :'Contact'
    },
    'Opportunity' : {
        label : 'Opportunity', value :'Opportunity'
    }
}

const tableColumns = [
    {label: 'Object Name' , fieldName : 'objectName' },
    {label: 'Record Name' , fieldName : 'recordName' },
    {label: 'Status' , fieldName : 'Status'}
]

export default class ApprovalWithTabs extends LightningElement {

    tabs =Object.keys(tabInfo).map((x)=>{
        return {label: x, value:x};
    });
    colInfo = tableColumns;
    @api processTable;
    errorInfo;
    defaultTab='Account';
    @wire(fetchOnGoingProcess,{objinfo : '$defaultTab'})
    wiredInfo(result){
        console.log('tabs####'+this.tabs);
        console.log('resultA####'+result.data);
        if(result.data){
            //this.processTable=result.data;
            this.processTable=result.data.map((x)=>{
                return { objectName : x.ProcessDefinition.TableEnumOrId, recordName: x.ProcessDefinition.Name, Status: x.Status }
            })
            this.errorInfo=undefined;
        }
        if(result.error){
            this.errorInfo=result.error;
            this.processTable=[];
        }
    }

    handleRowAction(event){
        console.info('data###'+event.detail.action.label);
    }

    handleActive(event){
        this.defaultTab=event.target.label;
    }

}