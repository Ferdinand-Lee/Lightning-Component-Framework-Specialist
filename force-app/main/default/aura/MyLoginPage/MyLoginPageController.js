({
	onLogin: function(component, event, helper) {
        var isvalid = component.find('loginInput').reduce(function(validSoFar, cmp){
            return validSoFar && cmp.get('v.validity').valid;
        }, true)
        console.log(isvalid == true)
		var username = component.get('v.username');
        var password = component.get('v.password');
        var user = {isAuthenticated: true};
        localStorage.setItem('user', JSON.stringify(user))
        
        helper.setState(component, {user: user});
        helper.goto(component, component.get('v.successPage'), component.get('v.successParams'))
        console.log(username, password);
	},
    onRegister: function(component, event, helper){
        var isvalid = component.find('registerInput').reduce(function(validSoFar, cmp){
            return validSoFar && cmp.get('v.validity').valid;
        }, true)
        console.log(isvalid == true)
        var username = component.get('v.username');
        var password = component.get('v.password');
        var email = component.get('v.emailaddress');
    },
    toggleRegister: function(component){
        component.set('v.isRegister', !component.get('v.isRegister'))
    }
})