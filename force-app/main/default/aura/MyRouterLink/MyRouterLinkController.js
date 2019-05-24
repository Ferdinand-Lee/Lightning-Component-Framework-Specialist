({
	onClick : function(component, event, helper) {
		var action = $A.get("e.c:MyRouterLinkEvent");
            action.setParams({
                page: component.get('v.page'),
                params: component.get('v.params')
            })
            action.fire();
	}
})