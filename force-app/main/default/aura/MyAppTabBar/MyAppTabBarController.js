({
	onClick : function(component, event, helper) {
        var tar = event.target;
        while(tar.tagName != 'BUTTON' && tar.tagName != 'button')
            tar = tar.parentElement;
        component.set('v.currentTab', tar.dataset.page)
		var action = $A.get("e.c:MyRouterLinkEvent");
            action.setParams({
                page: tar.dataset.page,
            })
            action.fire();
	}
})