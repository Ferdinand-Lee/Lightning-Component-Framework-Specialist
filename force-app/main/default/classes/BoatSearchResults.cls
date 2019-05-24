public class BoatSearchResults {
    @AuraEnabled
    public static List<Boat__c> getBoats(String boatTypeId){
        String soql = 'SELECT Picture__c,Name, Contact__r.Name, Geolocation__Latitude__s, Geolocation__Longitude__s FROM Boat__c';
        if(String.isNotBlank(boatTypeId)) soql += ' WHERE BoatType__c = :boatTypeId';
        return (List<Boat__c>)Database.query(soql);
    }
}