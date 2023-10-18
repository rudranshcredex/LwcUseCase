public with sharing class CreateRecords {
    @AuraEnabled(cacheable=true)
    public static void CreateRecordsOnCustomObjects(String selectedObjectList, string recordName) {

        SObject newRecord = Schema.getGlobalDescribe().get(selectedObjectList).newSObject();
        newRecord.put('Name', recordName);
        insert newRecord;

    }
}