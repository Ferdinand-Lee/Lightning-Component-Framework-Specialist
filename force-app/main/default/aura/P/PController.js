({
	init : function(component, event, helper) {
		console.log('P', 'init')
        component.set('v.user', {name:'ferdinand'})
	},
    onUserChange: function(component, event, helper){
        console.log('onUserChange', event.getParam('value') == event.getParam('oldValue'), JSON.stringify(event.getParams()))
    },
    onRefresh: function(component, event, helper){
        var user = component.get('v.user');
        user.name='kafuka';
        component.set('v.user', user);
    }
})