public with sharing class ProductAccessor {
    public ProductAccessor() {

    }

    @AuraEnabled
    public static List<ProductWrapper> fetchProducts(){
        try {
           Map<Id,Product2> prodMap = new Map<id,Product2>([SELECT Id,Name from Product2 where Name='Chicken Leg Piece']);
            
           List<ContentDocumentLink> contDocLinkList =[Select Id,ContentDocumentId,LinkedEntityId from ContentDocumentLink where LinkedEntityId in : prodMap.keySet()];
           Map<id,Id> contDocumentWithLinkedEntity = new Map<Id,Id>();
           for( ContentDocumentLink eachContDocLink : contDocLinkList){
            contDocumentWithLinkedEntity.put(eachContDocLink.ContentDocumentId,eachContDocLink.LinkedEntityId);
           }

           List<ContentVersion> conVersionList = [Select Id,contentDocumentId from ContentVersion where ContentDocumentId in :contDocumentWithLinkedEntity.keySet() ];
           Map<id,ContentVersion> contDocumentWithVersion = new Map<id,ContentVersion>();
           for( ContentVersion eachContDocVer : conVersionList){
                contDocumentWithVersion.put(eachContDocVer.ContentDocumentId,eachContDocVer);
           }
           List<ProductWrapper> prodWrapperLst = new List<ProductWrapper>();
           for( ContentDocumentLink eachContDocLink : contDocLinkList){
                Id prodId = contDocumentWithLinkedEntity.get(eachContDocLink.ContentDocumentId);
                ContentVersion conVersion = contDocumentWithVersion.get(eachContDocLink.ContentDocumentId);
                prodWrapperLst.add( new ProductWrapper(prodMap.get(prodId),conVersion));
           }
           system.debug('prodWrapperLst####'+prodWrapperLst);
           return prodWrapperLst;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    public class ProductWrapper{
        @auraEnabled
        public Product2 prodDetails;
        @auraEnabled
        public ContentVersion contVersionDetails;

        public ProductWrapper(Product2 prodDetails,ContentVersion contVersionDetails ){
            this.prodDetails=prodDetails;
            this.contVersionDetails=contVersionDetails;
        }
    }
}