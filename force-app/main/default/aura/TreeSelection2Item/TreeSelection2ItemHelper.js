({
    safeArray: function(value){
        value = value || [];
        value = $A.util.isArray(value) ? value : [value];
        return value;
    },
    select: function(component, checked){
        var model = component.get('v.model');
        var item = component.get('v.item');
        var value = component.get('v.value');
        
        var keyField = component.get('v.keyField');
        var selectedItems = component.get('v.selectedItems');
                
        var treeSelect = component.find('treeSelect');
        if(treeSelect) {
            treeSelect.selectAll(checked);
        }else{
            if(model == 'single'){
                selectedItems = [item];
            	value = item[keyField];
            }else{
                value = this.safeArray(value);
                if(checked){
                 	if(!value.includes(item[keyField])){
                        value.push(item[keyField])
                        selectedItems.push(item);
                    }   
                }else if(value.includes(item[keyField])){
                    value.splice(value.indexOf(item[keyField]), 1);
                    selectedItems.splice(selectedItems.indexOf(item), 1);
                }
            }                 
            component.set('v.selectedItems', selectedItems);
            component.set('v.value', value);
        }
    }
})