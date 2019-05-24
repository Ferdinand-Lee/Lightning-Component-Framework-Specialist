public class EChartController {
    @AuraEnabled
    public static List<AggregateResult> getChartData(){
        return [SELECT MAX(BoatType__c) id, BoatType__r.Name name, count(id) c FROM Boat__c GROUP BY BoatType__r.Name];
    }
}