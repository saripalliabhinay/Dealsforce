import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';
import LightningConfirm from 'lightning/confirm'
export default class LightningAlrets extends LightningElement {

    async showAlert(){
        const alert =await LightningAlert.open({
            message : 'You cant do this',
            theme : "error",
            label :"Error!"
        });
    }

    async showConfirmation(){
        const result = await LightningConfirm.open({

        });
        if(result=='OK'){
            console.info('Ok Clicked###');
        }else{
            console.log('result####',result);
        }
    }
}