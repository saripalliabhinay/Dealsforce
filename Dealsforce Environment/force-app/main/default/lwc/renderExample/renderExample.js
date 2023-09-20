import { api, LightningElement } from 'lwc';
import firstFile from './firstFile.html';
import secondFile from './secondFile.html';
export default class RenderExample extends LightningElement {

    isFirst;
    @api myVal='I am from LWC Component';
    render(){
        return this.isFirst? firstFile : secondFile;
    }

    handleClick(event){
        this.isFirst=this.isFirst?false:true;
    }
}