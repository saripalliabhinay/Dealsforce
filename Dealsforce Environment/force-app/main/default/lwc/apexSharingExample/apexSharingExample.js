import { wire ,  LightningElement } from 'lwc';
import fetchAccountsWithUserMode from '@salesforce/apex/AccountApexFunctionalities.fetchAccountsWithUserMode';
import fetchAccountsWithSystemMode from '@salesforce/apex/AccountApexFunctionalities.fetchAccountsWithSystemMode';
import fetchAccountsWithSecurityEnforced from '@salesforce/apex/AccountApexFunctionalities.fetchAccountsWithSecurityEnforced';
import insertAccountWithUserMode from '@salesforce/apex/AccountApexFunctionalities.insertAccountWithUserMode';
import directQuery from '@salesforce/apex/AccountApexFunctionalities.directQuery';
import updateAccountWithUserMode from '@salesforce/apex/AccountApexFunctionalities.updateAccountWithUserMode';
export default class ApexSharingExample extends LightningElement {

    @wire(fetchAccountsWithUserMode)
    userModeInfo({data,error}){
        if(data){
              console.info('withUserModedata####', data);
        }
        if(error){
                console.info('withUserModeerror###',error);
        }
    }

    @wire(fetchAccountsWithSystemMode)
    systemModeInfo({data,error}){
        if(data){
            console.info('withSystemModedata####', data);
        }
        if(error){
            console.info('withSystemModeerror####', error);
        }
    }

    @wire(fetchAccountsWithSecurityEnforced)
    securityEnforcedModeInfo({data,error}){
        if(data){
            console.info('withSecurityEnforcedData####', data);
        }
        if(error){
            console.info('withSecurityEnforcederror####', error);
        }
    }


    @wire(directQuery)
    directInfo({data,error}){
        if(data){
            console.info('withdirectQueryData####', data);
        }
        if(error){
            console.info('withdirectQueryerror####', error);
        }
    }


    handleClick(event){
        insertAccountWithUserMode()
        .then((result)=>{

        })
        .catch((error)=>{

        })
    }

    updateClick(event){
        updateAccountWithUserMode()
        .then((result)=>{
            console.info('result@@@',result);
        })
        .catch((error)=>{
               console.info('error@@@@',error);
        })
    }

    
    
}