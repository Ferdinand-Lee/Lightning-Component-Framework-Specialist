({
    safeArray: function(value){
        value = value || [];
        value = $A.util.isArray(value) ? value : [value];
        return value;
    }
})