public class ContactAccessor {

    @auraEnabled(cacheable=true)
    public static List<Contact> fetchContacts(){
        return [SELECT Id,FirstName,LastName,Account.Name from Contact ];
    }
}