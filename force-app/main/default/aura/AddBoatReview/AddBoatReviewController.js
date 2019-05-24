({
    doInit: function(component, event, helper){
        helper.onInit(component, event, helper);
    },
    onSave: function(component, event, helper){        
        component.set("v.boatReview.Boat__c", component.get('v.boat').Id);
        component.find("service").saveRecord(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                // record is saved successfully
                var resultsToast = $A.get("e.force:showToast");
                if(resultsToast){
                    resultsToast.setParams({
                    	"title": "Saved",
                    	"message": "The record was saved."
                    });
                    resultsToast.fire();
                }else{
                    alert('The record was saved.');
                }
                helper.onInit(component, event, helper);
                var addedEvent = component.getEvent('boatReviewAdded');
                addedEvent.fire();
            } else if (saveResult.state === "INCOMPLETE") {
                // handle the incomplete state
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                // handle the error state
                console.log('Problem saving boat review, error: ' + JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        });
    },
	onRecordUpdated: function(component, event, helper) {
		console.log('AddBoatReviewController.onRecordUpdated')
        
	}
})