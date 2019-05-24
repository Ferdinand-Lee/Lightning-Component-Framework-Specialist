({
    getPath: function(component){
        var path = component.get('v.path');
        return [...(!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)]
    }
})