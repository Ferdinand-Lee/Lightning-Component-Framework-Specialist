({
    init: function(component, event, helper){
        
    },
	doSearch : function(component, event, helper) {
        var params = event.getParam('arguments')
        helper.onSearch(component, params.boatTypeId);
	},
    onBoatSelect: function(component, event, helper){
        component.set("v.selectedBoatId", event.getParam("boatId"));
    }
})