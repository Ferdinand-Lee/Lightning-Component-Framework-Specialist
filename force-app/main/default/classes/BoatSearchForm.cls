public class BoatSearchForm {
	@AuraEnabled
    public static List<BoatType__c> getAllTypes(){
        return [SELECT Id, Name FROM BoatType__c];
    }
}