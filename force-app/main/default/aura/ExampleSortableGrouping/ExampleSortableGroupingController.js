({
	onAlert : function(component, event, helper) {
		let list = component.get('v.' + event.getSource().get('v.value'));
        alert(JSON.stringify(list));
	}
})