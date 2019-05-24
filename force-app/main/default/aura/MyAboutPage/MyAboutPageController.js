({
	add : function(component, event, helper) {
		var state = component.get('v.state');
        state.counter ++ ;
        helper.setState(component, state);
	},
    minus: function(component, event, helper) {
        var state = component.get('v.state');
        state.counter -- ;
        helper.setState(component, state);
    },
    toggleRole: function(component, event, helper) {  
        var state = component.get('v.state');
        var {user} = state;        
		var roles = new Set(user.roles || []);
        var source = event.getSource();
        roles[source.get('v.value')](source.get('v.name'))
        user.roles = Array.from(roles);
        helper.setState(component, user);
    },
})