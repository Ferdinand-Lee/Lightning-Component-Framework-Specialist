({
	reset : function(component) {
		var name = component.get('v.name');
		var container = component.find('container');        
        $A.util.removeClass(container, `${name}-enter-active`);
        $A.util.removeClass(container, `${name}-enter-to`);
        $A.util.removeClass(container, `${name}-leave-active`);
        $A.util.removeClass(container, `${name}-leave-to`);
        return container;
	}
})