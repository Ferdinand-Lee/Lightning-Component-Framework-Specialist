({
	onBoatSelected: function(component, event, helper) {
        component.set('v.id', event.getParam('boat').Id);
        component.find('service').reloadRecord();
	},
    onBoatReviewAdded: function(component, event, helper){
        component.find("tabs").set("v.selectedTabId", "boatreviewtab");
        var boatReviews = component.find("boatReviews");
        boatReviews && boatReviews.refresh();
    },
    onRecordUpdated: function(component, event, helper){
        var boatReviews = component.find("boatReviews");
        boatReviews && boatReviews.refresh();
    }
})