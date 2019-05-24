({
	onInit : function(component, event, helper) {
        var column = component.get('v.column');
        var row = component.get('v.row');
        var value = component.get('v.row.' + column.fieldName);
        var style = '';
        if(column.style){
            if($A.util.isObject(column.style)){
                for(var styleType in column.style){ // color
                    for(var styleValue in column.style[styleType]){ // green
                        if(helper.conditionMatch(column.style[styleType][styleValue], row)){
                            style += (styleType + ':' + styleValue + ';');
                            break;
                        }
                    };
                }
            }
        }
        component.set('v.style', style);
		component.set('v.value', value);
	}
})