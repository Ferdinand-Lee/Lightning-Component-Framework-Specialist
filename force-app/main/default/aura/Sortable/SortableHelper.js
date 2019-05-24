({
	isFunction: function(fn) {
		return Object.prototype.toString.call(fn) === '[object Function]';
	},
    fireAction: function(component, actionName, evt){
        let action = component.get('v.' + actionName);
        let self = this;
        if(action && action.setCallback){
            action.setCallback(this, function(response, $component){
                var status = response.getState();
                if(status === 'SUCCESS'){
                    let fn = response.getReturnValue();
                    self.isFunction(fn) && fn(evt)
                }
            })
            $A.enqueueAction(action);
            return true;
        }else{
            return false;
        }
    }
})