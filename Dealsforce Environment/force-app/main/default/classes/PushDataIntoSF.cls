@RestResource(urlMapping='/pushIntoSF')
global class PushDataIntoSF {

    @httpPost
    global static Id insertAccounts(String name){
        Account acc= new Account();
        acc.name = name;
        insert acc;
        return acc.Id;
    }
    
}