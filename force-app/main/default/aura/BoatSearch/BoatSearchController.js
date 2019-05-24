({
	onFormSubmit : function(component, event, helper) {
		var resultCmp = component.find("boatSearchResults");
        var formData = event.getParam('formData');        
        resultCmp.search(formData.boatTypeId);
	},
    onEchartSelect: function(component, event, helper){
        var params = event.getParam('params');
        var resultCmp = component.find("boatSearchResults");
        var formCmp = component.find("boatSearchForm");
        formCmp.find('typeSelect').set('v.value', params.data._.id)
        resultCmp.search(params.data._.id);        
    }
})