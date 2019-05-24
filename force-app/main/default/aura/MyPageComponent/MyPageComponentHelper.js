({
    setState: function(component, state) {
        component.set('v.state', Object.assign({}, component.get('v.state'), state))
	},
    goback: function(component, size) {
        if($A.util.isUndefinedOrNull(size)) size = 1;
        var action = $A.get("e.c:MyGoBackEvent");
            action.setParams({
                size: size
            })
            action.fire();
    },
    goto: function(component, page, params){
        var action = $A.get("e.c:MyRouterLinkEvent");
            action.setParams({
                page: page,
                params: params
            })
            action.fire();
    },
    gotoError:function(component, params){
        var superComponent = component.getSuper();
        if(superComponent){            
            while(!superComponent.isInstanceOf('c:MyPageComponent'))
                superComponent = superComponent.getSuper();
            this.goto(component, superComponent.get('v.errorPage'), params)
        }
    },
    toggleLoading: function(component, isShow){        
        var superComponent = component.getSuper();
        if(superComponent){            
            while(!superComponent.isInstanceOf('c:MyPageComponent'))
                superComponent = superComponent.getSuper();
            var backdrop = superComponent.find('backdrop');
            var spinner = superComponent.find('spinner');        
            if(isShow){                
                $A.util.removeClass(spinner, 'slds-hide');
                $A.util.addClass(backdrop, 'slds-backdrop--open');
            }else{                
                $A.util.addClass(spinner, 'slds-hide');
                $A.util.removeClass(backdrop, 'slds-backdrop--open');
            }		
        }        	        
    }
})