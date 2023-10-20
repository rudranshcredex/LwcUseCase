public with sharing class updateFieldDuration {
    @AuraEnabled
    public static void updateDurationField(String accountId, String openTime) {

        system.debug('account id----->'+accountId);
        system.debug('opentime'+openTime);
        Account acc = [select Time_Duration__c from Account Where Id = :accountId limit 1];
        acc.Time_duration__c = openTime;
        update acc;
    }
}


