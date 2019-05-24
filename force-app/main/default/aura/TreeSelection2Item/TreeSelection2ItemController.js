({
    onInit: function(component, event, helper) {  
        console.log('init')
        var value = helper.safeArray(component.get('v.value'));
        var keyField = component.get('v.keyField');
        var item = component.get('v.item');
        var selectedItems = helper.safeArray(component.get('v.selectedItems'));
        var isSelected = value.includes(item[keyField]);
        if(isSelected) {
            selectedItems.push(item);
            component.set('v.checked', isSelected);
            component.set('v.expanded', true)
        }else{
            var treeSelect = component.find('treeSelect');
            if(treeSelect){
                component.set('v.expanded', helper.safeArray(treeSelect.find('selectionItem')).some(function(item){
                    return item.get('v.checked') || item.get('v.expanded');
                }));
            }
        }
        component.set('v.selectedItems', selectedItems);        
    },
	toggleExpend : function(component, event, helper) {		
        component.set('v.expanded', !component.get('v.expanded'));
	},
    toggleSelect: function(component, event, helper) {        
        var item = helper.select(component, component.get('v.checked')); 
		var treeSelectEvent = component.getEvent("onTreeSelection");
        treeSelectEvent.setParams({
            item: item
        });
        treeSelectEvent.fire();
    },
    onTreeSelection: function(component, event, helper){
        var treeSelect = component.find('treeSelect');
        if(treeSelect){
            component.set('v.checked', helper.safeArray(treeSelect.find('selectionItem')).every(function(item){
                return item.get('v.checked');
            }));
        }
        var treeSelectEvent = component.getEvent("onTreeSelection");
        treeSelectEvent.setParams(event.getParams());
        treeSelectEvent.fire();
    },                
    select: function(component, event, helper){ 
        var checked = event.getParam('arguments').checked;
        var limit = component.get('v.limit');
        var selectedItems = component.get('v.selectedItems');
        if(!checked || selectedItems.length < limit){
        	component.set('v.checked', checked);
            helper.select(component, checked);
        }                
    }
})