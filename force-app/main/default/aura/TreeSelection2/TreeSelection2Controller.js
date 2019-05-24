({
    onTreeSelection: function(component, event, helper){		
        var treeSelectEvent = component.getEvent("onTreeSelection");
        treeSelectEvent.setParams(event.getParams());
        treeSelectEvent.fire();
    },
    selectAll: function(component, event, helper){
        helper.safeArray(component.find('selectionItem')).forEach(function(item){
            item.select(event.getParam('arguments').checked);
        })
    },
    getSelectedItems: function(component, event, helper){               
        return component.get('v.selectedItems');
    }
})