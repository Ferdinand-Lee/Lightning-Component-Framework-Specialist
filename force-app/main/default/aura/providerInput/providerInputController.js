({
	onInit : function(component, event, helper) {
		component.set('v.value', component.getReference('v.object.' + component.get('v.path')))
	},
    setvalue: function(component, evnet, helper){
        component.set('v.object', component.get('v.object'));
    }
})