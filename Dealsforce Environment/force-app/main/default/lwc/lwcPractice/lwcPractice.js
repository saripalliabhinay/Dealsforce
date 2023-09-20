import { api, LightningElement } from 'lwc';

export default class LwcPractice extends LightningElement {
    @api isCat;
    @api isRat;
    @api isDog;
    @api isNone;

    changeMe;

    constructor(){
        super();
    }
    noOfTimesCalled=0;
    
    connectedCallback(){
        this.noOfTimesCalled=this.noOfTimesCalled+1;
        console.log('Inside Connected Callback'+this.noOfTimesCalled);
    }

    
    renderedCallback(){
        //this.noOfTimesCalled=this.noOfTimesCalled+1;
        console.log('inside render callback'+this.noOfTimesCalled);
    }
    /*
    disconnectedCallback(){
        this.noOfTimesCalled=this.noOfTimesCalled+1;
        console.log('inside disconnected callback'+this.noOfTimesCalled)
    }

    errorCallback(error, stack) {
        this.noOfTimesCalled=this.noOfTimesCalled+1;
        this.error = error;
        console.log('inside error callback'+this.noOfTimesCalled);
    }*/


    get name(){
        return 'Abhinay';
    }

    userInfo= 'Abhinay lwc'
    get itemName(){
        console.log('inside getter##');
        return this.userInfo;
    }

    set itemName(value){
        this.userInfo=value.toUpperCase();;
    }

    handleClick(event){
        this.itemName = 'After Click';
    }

    handleChange(event){
        this.changeMe=this.name;
    }
    handleCat(event){
        this.isCat=true;
        this.isRat=false;
    }

    handleRat(event){
        this.isCat=false;
        this.isRat=true;
    }

    handleDog(event){
        this.isCat=false;
        this.isRat=false;
    }
}