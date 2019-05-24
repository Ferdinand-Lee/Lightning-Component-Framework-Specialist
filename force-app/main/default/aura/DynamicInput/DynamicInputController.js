({
	onInit : function(component, event, helper) {
		var data = component.get('v.data');
        var path = component.get('v.path');
        
        var value = null;
        value = data[path];
        //如果从Path可以直接获取值，设置标记
        if(value) component.isAbsloutePath = true;
        
        if(!value && path){
            value = helper.getPath(component)
            			  .reduce((o, k) => (o || {})[k], data);
        }
        component.isInit = true;
        component.set('v.value', value);
		        
        var valueRef = component.getReference('v.value');
        var dynamicComponents = [];
        var is = component.get('v.is');
        var params = component.get('v.params');
        var attributes = Object.assign({value:valueRef}, params);
        switch(is){
        	case 'input':
                dynamicComponents.push(['lightning:input', attributes]);                
                break;
           	case 'textarea':
                dynamicComponents.push(['lightning:textarea', attributes]);                
                break;
            case 'select':
                dynamicComponents.push(['lightning:select', attributes]);
                params.options.forEach(function(option){
                    dynamicComponents.push(['option', option])
                })
        }
        helper
        .buildBody(dynamicComponents)
        .then(function(cmps){
            if(is == 'select'){
                var select = cmps.shift();
                select.set('v.body', cmps);
                return select;
            }
            return cmps;
        })
        .then(function(cmps){
            component.set('v.body', cmps)
        })
        .then(function(){
            component.isInit = false;
        })
	},
    onValueChange: function(component, event, helper){
        if(component.isInit){      
            return;
        }
        var value = event.getParam('value');
        var data = component.get('v.data');
        var oldData = Object.assign({}, data);
        var path = component.get('v.path');
        var target = data;
        if(component.isAbsloutePath){
            target[path] = value
        }else{
            var ps = helper.getPath(component);
            if(ps.length > 1){
                target = ps.splice(0, ps.length - 1).reduce((o, k) => o[k] = (o[k] || {}), data)
            }
            target[ps[0]] = value;
        }
        var params = component.get('v.params');
        if(params.isChangeNotify){
            var dynamicInputChangeEvt = component.getEvent("dynamicInputChangeEvt");
            dynamicInputChangeEvt.setParams({
                value: value,
                oldValue: event.getParam('oldValue'),
                data:data,
                oldData:oldData,
                item: params
            });
            dynamicInputChangeEvt.fire();
        }
    }
})