({	
    onInit: function(component, event, helper){
        setTimeout($A.getCallback(function(){            
            helper.reset(component, event, helper);
        }))
    },
    onSelectAll: function(component, event, helper){
        var keyField = component.get('v.keyField');
        var checked = event.getParam('checked');
        var maxRowSelection = component.get('v.maxRowSelection');
        var filteredData = component.get('v.filteredData');
        if(checked){            
            var selectedRows = component.get('v.selectedRows');
            if(maxRowSelection){
                for(var i = 0; i < filteredData.length && selectedRows.length < maxRowSelection; i++){
                    if(!filteredData[i].$checked){
                        selectedRows.push(filteredData[i].$source[keyField]);
                        filteredData[i].$checked = true;
                    }
                }
            }else{
            	component.set('v.selectedRows', filteredData.map(function(row){
                    row.$checked = true;
                    return row.$source[keyField]
                }));    
            }            
        }else{
            filteredData.forEach(function(row){
                row.$checked = false;
            })
            component.set('v.selectedRows', []);
        }
        component.set('v.filteredData', filteredData);
        helper.fireRowSelection(component, filteredData);
    },
    onSelect: function(component, event, helper){
        var keyField = component.get('v.keyField');
    	var checkbox = event.getSource();
		var value = checkbox.get('v.value');
		var checked = checkbox.get('v.checked');
        var selectedRows = component.get('v.selectedRows');
        var isIncludes = selectedRows.find(function(selectedRow){
            return selectedRow == value[keyField];
        })
        
        if(checked && !isIncludes){
            selectedRows.push(value[keyField]);
        }else if(!checked && isIncludes){
            selectedRows.splice(selectedRows.indexOf(value[keyField]), 1);
        }
        component.set('v.selectedRows', selectedRows);
        helper.fireRowSelection(component, component.get('v.filteredData'));
    },
    onActionClick: function(component, event, helper){
        var target = event.getSource();
        var action = target.get('v.name');
        var row = target.get('v.value');
        helper.fireRowaction(component, row, action);
    },
    onFilterChange: function(component, event, helper) {
        helper.reset(component, event, helper);
    },
    onHideCheckboxColumnChange: function(component, event, helper) {
        helper.reset(component, event, helper);
    },
    onDataChange: function(component, event, helper) {
        helper.reset(component, event, helper);
    },
    getSelectedRows:function(component){
        var filteredData = component.get('v.filteredData');
    	return filteredData.filter(row => row.$checked).map(row => row.$source);
    },
    onmousedown: function(component, event, helper) {
        var childObj = event.target
        var parObj = childObj.parentNode;
        var count = 1;
        while (parObj.tagName != 'TH') {
            parObj = parObj.parentNode;
            count++;
        }
        console.log('final tag Name' + parObj.tagName);
        var mouseStart = event.clientX;
        component.set("v.mouseStart", mouseStart);
        component.set("v.oldWidth", parObj.offsetWidth);
    },
    ondrag: function(component, event, helper) {
        console.log('setNewWidth')
        var childObj = event.target
        var parObj = childObj.parentNode;
        var count = 1;
        while (parObj.tagName != 'TH') {
            parObj = parObj.parentNode;
            count++;
        }
        var mouseStart = component.get("v.mouseStart");
        var oldWidth = component.get("v.oldWidth");
        var newWidth = event.clientX - parseFloat(mouseStart) + parseFloat(oldWidth);
        parObj.style.width = newWidth + 'px';
    }
})