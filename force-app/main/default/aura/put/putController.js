({
	onInit : function(component, event, helper) {
		var object = component.get('v.object'),
            path = component.get('v.path');
        var value = null;
        value = object[path];
        //如果从Path可以直接获取值，设置标记
        if(value) component.isAbsloutePath = true;
        
        if(!value && path){
            value = helper.getPath(component)
            			  .reduce((o, k) => (o || {})[k], object);
        }
        
        component.get('v.body').forEach(function(input){
            if(input.isInstanceOf('lightning:input') || 
               input.isInstanceOf('lightning:select') || 
               input.isInstanceOf('lightning:textarea') || 
               input.isInstanceOf('lightning:checkboxGroup') ||
               input.isInstanceOf('lightning:radioGroup')){
                if(input.isInstanceOf('lightning:checkboxGroup')) value = value || [];
                input.set('v.value', value)
                input.addValueHandler({
                    value: "v.value",
                    event: "change",
                    globalId: component.getGlobalId(),
                    method: function(event) {
                        var params = event.getParams();
                        var target = object;
                        var oldValue = null;
                        if(component.isAbsloutePath){
                            oldValue = target[path];
                            target[path] = params.value
                        }else{
                            var ps = helper.getPath(component);
                            if(ps.length > 1){
                                target = ps.splice(0, ps.length - 1).reduce((o, k) => o[k] = (o[k] || {}), object)
                            }
                            oldValue = target[ps[0]];
                            target[ps[0]] = params.value;
                        }
                        
                        var cs = Symbol.for('ChangeSet');
                        var changeSet = object[cs] || (object[cs] = {});
                        var cp = changeSet[path] || (changeSet[path] = {original: oldValue});
                        cp.value = params.value;
                    }
                });
            }
        })
	},
    onChange: function(component, event, helper){
        var object = component.get('v.object'),
            path = component.get('v.path');
        var value = null;
        value = object[path];
        //如果从Path可以直接获取值，设置标记
        if(value) component.isAbsloutePath = true;
        
        if(!value && path){
            value = helper.getPath(component)
            			  .reduce((o, k) => (o || {})[k], object);
        }
        component.get('v.body').forEach(function(input){
            if(input.isInstanceOf('lightning:checkboxGroup')) value = value || [];
            input.set('v.value', value);
        });
    }
})