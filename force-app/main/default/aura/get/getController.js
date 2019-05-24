({
	onInit : function(component, event, helper) {
		var object = component.get('v.object'),
            path = component.get('v.path'),
            defaultValue = component.get('v.defaultValue');
        var value = null;
        value = object[path];
        if(!value && path){
            value = (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
                        .reduce((o, k) => (o || {})[k], object);
        }
        value = value || defaultValue;
        component.set('v.value', value);
	}
})