({
    onInit:function(component, event, helper) {
        component.set('v.privateIsTrue', component.get('v.isTrue'));
    },
    onIsTrueChnage : function(component, event, helper) {
        var isTrue = component.get('v.isTrue');
        var name = component.get('v.name');                
        if(isTrue){
            component.set('v.privateIsTrue', isTrue);
            var container = helper.reset(component);
            $A.util.addClass(container, `${name}-enter`)
            $A.util.addClass(container, `${name}-enter-active`)                                             
            requestAnimationFrame($A.getCallback(function(){
                $A.util.removeClass(container, `${name}-enter`)
                $A.util.addClass(container, `${name}-enter-to`)                                             
            }))
        }else {
            var container = helper.reset(component);
            $A.util.addClass(container, `${name}-leave-active`)
            $A.util.addClass(container, `${name}-leave`)            
            requestAnimationFrame($A.getCallback(function(){ 
                $A.util.removeClass(container, `${name}-leave`)
                $A.util.addClass(container, `${name}-leave-to`)    
            }))
        }
    },
    ontransitionend : function(component, event, helper) {
        console.log('ontransitionend');
        var isTrue = component.get('v.isTrue');
        helper.reset(component);
        isTrue || component.set('v.privateIsTrue', isTrue);
    }
})