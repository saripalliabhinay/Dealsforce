public with sharing class AccountAccessor {
    public AccountAccessor() {

    }

    @AuraEnabled
    public static List<Account> fetchAccount(String industry){
        try {
           return [Select id,Name from Account where industry=:industry]; 
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccountWired(String industry){
        try {
            system.debug('industry###'+industry);
            if(industry != null && industry !=''){
                String industryInfo = '%'+industry+'%';
                return [Select id,Name,Industry from Account where industry like :industryInfo]; 
            }else {
                system.debug('insideElse##');
                return [SELECT Id,Name,Industry FROM Account limit 10];
            }
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccountWiredWithoutParam(){
        try {
           return [Select id,Name,Industry from Account where Industry != null LIMIT 10]; 
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static Object fetchRecords(String targetObject,String targetFields){
        if(!string.isBlank(targetObject) && !string.isBlank(targetFields)){
            if(targetFields.contains('CloneSourceId,')){
                targetFields=targetFields.replace('CloneSourceId,','');
            }
           String query= 'SELECT '+targetFields.removeEnd(',')+' FROM '+targetObject+ ' LIMIT 10';
           system.debug('query###'+query);
           return Database.query(query);
        }
        return null;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> gatherContacts(String accId){
        try {
            return [SELECT Id,FirstName,LastName FROM Contact WHERE AccountId =: accId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @auraEnabled(cacheable=true)
    public static List<Account> accountWithCases(){
        system.debug('info###'+[Select Id,Name,Rating,Industry,Active__c,(Select Id,Priority FROM Cases) FROM Account]);
        return [Select Id,Name,Rating,Industry,Active__c,(Select Id,Priority FROM Cases) FROM Account];
    }

    @auraEnabled
    public static boolean updateAccount(String accountId,String info){
       Account acc= (Account)JSON.deserialize(info, Account.class);
       acc.Id=accountId;
       boolean isUpdated=false;
       try{
           update acc;
           isUpdated=true;
           return isUpdated;
       }catch(Exception e){
           system.debug('exception###'+e);
           return isUpdated;
       }
    }

    @AuraEnabled(cacheable=true)
    public static List<Case> fetchCases(){
        try {
            return [SELECT Id,Status,CaseNumber from Case limit 10];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}