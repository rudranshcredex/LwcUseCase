public with sharing class GetCustomRecords {
    @AuraEnabled(cacheable=true)
    public static List<sobject> getRecords(String selectedObjectList){
       
        system.debug('selectedObjectList--->'+ selectedObjectList);
        List<sObject> records = new List<sObject>();
        try {
            
            String query = 'SELECT ';
            Map<String, Schema.SObjectField> fields = Schema.getGlobalDescribe().get(selectedObjectList).getDescribe().fields.getMap();
            
            for (String fieldName : fields.keySet()) {
                if (fields.get(fieldName).getDescribe().isAccessible()) {
                    query += fieldName + ', ';
                }
            }
            
            query = query.substring(0, query.length() - 2);
            query += ' FROM ' + selectedObjectList;
            
            records = Database.query(query);
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
        }
        
        system.debug('get records'+ records);
        
        return records;

    }
}
