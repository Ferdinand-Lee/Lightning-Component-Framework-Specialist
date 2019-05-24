({
    onInit:function(component, event, helper) {
    	var isTrue = component.get('v.isTrue');
        if(!isTrue){
            $A.util.addClass(component.find('container'), 'slds-hide');
        }
    },
    onIsTrueChnage : function(component, event, helper) {
    	var isTrue = component.get('v.isTrue');
        var name = component.get('v.name');        
        var container = helper.reset(component);                
        if(isTrue){
            $A.util.removeClass(container, `slds-hide`);
            $A.util.addClass(container, `${name}-enter-active`);
            $A.util.addClass(container, `${name}-enter`);
            
            requestAnimationFrame($A.getCallback(function(){ 
                $A.util.removeClass(container, `${name}-enter`);
                $A.util.addClass(container, `${name}-enter-to`);
            }))
        }else {
            $A.util.addClass(container, `${name}-leave-active`);
            $A.util.addClass(container, `${name}-leave`);
            requestAnimationFrame($A.getCallback(function(){
                $A.util.removeClass(container, `${name}-leave`);
                $A.util.addClass(container, `${name}-leave-to`);
            }))
        }
    },
	ontransitionend : function(component, event, helper) {
        console.log('ontransitionend');        
        var isTrue = component.get('v.isTrue');
        var container = helper.reset(component);        
        isTrue ||  $A.util.addClass(container, `slds-hide`);
	}
})