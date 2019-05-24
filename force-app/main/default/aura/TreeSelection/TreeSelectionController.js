({
    onInit: function(component, event, helper) {  
        console.log('init')      
        component.get('v.items').forEach(function(item){
            var selectedItems = helper.getSelectedItems(component, item.items);
            if(selectedItems.length){
                selectedItems.forEach(function(selectedItem){
                    selectedItem.$checked = true;
                    component.get('v.selectedItems').push(selectedItem);
                })
                item.$expanded = true;
            }else {
                item.$expanded = helper.hasExpends(item.items);
            }
        });        
    },
	toggleExpend : function(component, event, helper) {
		var item = event.getSource().get('v.value');
        var items = component.get('v.items');
        item.$expanded = !item.$expanded;
        component.set('v.items', items);
	},
    toggleSelect: function(component, event, helper) {
        var model = component.get('v.model');        
        var items = component.get('v.items');
        var value = component.get('v.value');
        var checked = event.getParam('checked');
        var item = event.getSource().get('v.value');
        var keyField = component.get('v.keyField');
        var selectedItems = component.get('v.selectedItems');
        if(model == 'single'){
            selectedItems.forEach(function(item){
                item.$checked = false;
            })
            item.$checked = true;
            selectedItems = [item];
            value = item[keyField];
        }else{
            value = helper.safeArray(value);
            
            function processValue(item){
                if(checked){                            
                	value.includes(item[keyField]) || value.push(item[keyField]);
                	selectedItems.includes(item) || selectedItems.push(item);
                }else if(value.includes(item[keyField])){
                    value.splice(value.indexOf(item[keyField]), 1);
                    selectedItems.splice(selectedItems.indexOf(item), 1);
                }
            }
        
            function process(items){
                items.forEach(function(subItem){
                    if($A.util.isEmpty(subItem.items)){
                        processValue(subItem)
                    }else {
                        process(subItem.items)
                    }
                    subItem.$checked = checked;
                })
            }
            
            if(item.items && item.items.length) {
                //toggle all
                process(item.items);              
            }else{
                processValue(item)
            }   
        }    	
    	component.set('v.items', items);
    	component.set('v.selectedItems', selectedItems);
        component.set('v.value', value);
                
		var treeSelectEvent = component.getEvent("onTreeSelection");
        treeSelectEvent.setParams({
            item: item
        });
        treeSelectEvent.fire();
    },
    onTreeSelection: function(component, event, helper){
		var items = component.get('v.items');
        var checked = event.getParam('checked');
        items.forEach(function(item){
            if(item.items && item.items.length){
                item.$checked = item.items.every(function(subItem){
                    return subItem.$checked;
                })
            }
        })
        component.set('v.items', items);
        var treeSelectEvent = component.getEvent("onTreeSelection");
        treeSelectEvent.setParams(event.getParams());
        treeSelectEvent.fire();
    },                
    getSelectedItems: function(component, event, helper){               
        var selectedItems = helper.getSelectedItems(component, component.get('v.items'));
        var subSelectedItems = [];
        var subTrees = component.find('treeSelect');
        if(subTrees){
            subTrees = helper.safeArray(subTrees);
            subSelectedItems = subTrees.reduce(function(o, subTree){
                return o.concat(subTree.getSelectedItems());
            }, [])
        }
        return selectedItems.concat(subSelectedItems);
    }
})