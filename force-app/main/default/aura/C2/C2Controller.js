({
	init : function(component, event, helper) {
		console.log('C2', 'init')
	},
    onRefresh: function(component, event, helper){
        var user = component.get('v.user');        
        component.set('v.user', user);
    },
    changeName: function(component, event, helper){
        var user = component.get('v.user');
        user.name='amy'
        component.set('v.user', user);
    }
})