({
    setOpen : function(component, event, helper) {
        var isOpen = event.getParam('arguments').isOpen;
        if(component.get('v.isOpen') == isOpen){
            return ;
        }
        
        var el = component.find('content').getElement();
        
        if(!isOpen){
            el.classList.add('fade')
            setTimeout(function(){                
                requestAnimationFrame($A.getCallback(function(){
                    el.classList.add('fade-leave')
                }));
            });            
        }else{
            component.set('v.isOpen', true);
            el.classList.add('fade-enter');
            el.classList.add('fade');
            setTimeout(function(){                
                requestAnimationFrame(function(){
                    el.classList.remove('fade-enter')
                });
            });
        }
    },
    ontransitionend: function(component, event, helper) {
        var el = component.find('content').getElement();
        el.classList.remove('fade')
        if(el.classList.contains('fade-leave')){
            el.classList.remove('fade-leave');
            component.set('v.isOpen', false);
        }
    }
})