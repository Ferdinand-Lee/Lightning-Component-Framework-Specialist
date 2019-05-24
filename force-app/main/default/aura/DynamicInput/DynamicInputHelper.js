({
	getPath: function(component){
        var path = component.get('v.path');
        return [...(!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)]
    },
    buildBody: function(components){
        return new Promise(function(resolve, reject){
            $A.createComponents(components, function(cmps, status){
                if(status === "SUCCESS"){
                    resolve(cmps)
                }else{
                    reject(status);
                }
            })
        });
    }
})