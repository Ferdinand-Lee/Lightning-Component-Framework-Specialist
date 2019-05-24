({
	getSelectedItems : function(component, items) {
		var value = component.get('v.value');
        var keyField = component.get('v.keyField');
        value = this.safeArray(value);        
        return this.safeArray(items).filter(function(item){
            return value.includes(item[keyField])
        });
	},
    hasExpends: function(items){
        return this.safeArray(items).some(function(item){
            return item.$expanded;
        })
    },
    safeArray: function(value){
        value = value || [];
        value = $A.util.isArray(value) ? value : [value];
        return value;
    }
})