public with sharing class ObjectHelper {
    @AuraEnabled(cacheable=true)
     public  List<String> getObjects() {
        List<Schema.SObjectType> objectTypes = Schema.getGlobalDescribe().values();
        List<String> objectNames = new List<String>();

        for (Schema.SObjectType objectType : objectTypes) {
            string name = objectType.getDescribe().getName();
            if(name.contains('__c')){
                 objectNames.add(name);
            }  
        }
        return objectNames;
    }
}