({
	handleClick : function(component, event, helper) {
			
		$A.createComponent("lightning:icon", {
            iconName:"action:approval",
            alternativeText:"Approved"
        }, function (contentComponent, status, error) {
            if (status === "SUCCESS") {
                component.set("v.cp", contentComponent)
            } else {
                throw new Error(error);
            }
        });
        
        //component.set("v.cp", "123");
	},
    doInit : function(component, event, helper) {
        debugger;
		component.getSuper().set("v.tabs", ["a","b","c"])
	}
})