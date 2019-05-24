({
	onInit : function(component, event, helper) {
		component.find("service").getNewRecord(
            "BoatReview__c", // sObject type (objectApiName)
            null,      // recordTypeId
            true,     // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.boatReview");                                
                var error = component.get("v.recordError");
                console.log(rec)
                if(error || (rec === null || rec === undefined)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
            })
        );
	}
})