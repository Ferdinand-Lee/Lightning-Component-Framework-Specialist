({
    onInit: function(component, event, helper){        
        component.addValueProvider(
            'storage',
            {
                get: function(key, comp) {
                    return sessionStorage.getItem(key);
                },
                set: function(key, value, comp) {
                    sessionStorage.setItem(key, value);
                }
            }
        );
    },
	onClick : function(component, event, helper) {
        var users = component.get('v.users');
        var cs = Symbol.for('ChangeSet');
        users.forEach(function(user){
            console.log(JSON.stringify(user[cs]));
        })
		alert(JSON.stringify(users))
	},
    onAddUser: function(component, event, helper){
        var users = component.get('v.users');        
        users.push({id: users.length + 1});
        component.set('v.users', users)
    }
})