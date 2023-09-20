public class AccountApexFunctionalities {
	
    @auraEnabled(cacheable=true)
    public static List<Account> fetchAccountsWithUserMode(){
        List<Account> accList = [SELECT Id,Name,Active__c from Account WITH USER_MODE];
        return accList;
    }
    
    @auraEnabled(cacheable=true)
    public static List<Account> fetchAccountsWithSystemMode(){
        List<Account> accList = [SELECT Id,Name,Active__c from Account WITH SYSTEM_MODE];
        return accList;
    }
    
    
    @auraEnabled(cacheable=true)
    public static List<Account> fetchAccountsWithSecurityEnforced(){
        List<Account> accList = [SELECT Id,Name,Active__c from Account WITH SECURITY_ENFORCED];
        return accList;
    }
    
    @auraEnabled(cacheable=true)
    public static List<Account> directQuery(){
        List<Account> accList = [SELECT Id,Name,Active__c from Account];
        return accList;
    }
    
    @auraEnabled(cacheable=false)
    public static Account insertAccountWithUserMode(){
        Schema.DescribeSObjectResult drSObj = Schema.sObjectType.Account;
        Account acc= new Account();
        acc.Name='Test';
        acc.Active__c='No';
        if(drSObj.isCreateable()){
            system.debug('creatable###');
            insert as user acc;
        }
        
        return acc;
    }
    
    @auraEnabled
    public static Account updateAccountWithUserMode(){
        Account acc = [SELECT Id,Active__c FROM Account with USER_MODE ORDER BY CreatedDate desc LIMIT 1];
        acc.Name='Test Update 412321';
        acc.Active__c='Yes';
        update acc;
        return acc;
        
    }
}