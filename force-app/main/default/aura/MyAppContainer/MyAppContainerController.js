({
	onInit : function(component, event, helper) {
        var user = JSON.parse(localStorage.getItem('user'));
		debugger;
        helper.setState(component,{
            queryParams: helper.parseURL(window.location.href).params,
            user: user || {}
        });
        var tabBar = component.get('v.tabBar');
        if(!$A.util.isUndefinedOrNull(tabBar)){
            setTimeout($A.getCallback(function(){
                helper.navigate(component, tabBar.list[0].pageName, {});
            }),0)
        }
	},
    onMyRouteLink : function(component, event, helper) {
        var {page, params} = event.getParams();
        helper.navigate(component, page, params)
	},
    onMyGoBack: function(component, event, helper) {
        var size = event.getParam('size')
        var pageStack = component.get('v.pageStack');
        var cmp = pageStack[pageStack.length - size - 1];
        pageStack.length = pageStack.length - 1;
        if(cmp){            
            var myAppTabBar = component.find('myAppTabBar');
            if(myAppTabBar) myAppTabBar.set('v.currentTab', cmp.getType());
            component.set('v.view', cmp);
            if(cmp.isInstanceOf('c:MyPageComponent') || !$A.util.isUndefinedOrNull(cmp.get('v.showTabBar'))){
                component.set('v.showTabBar', cmp.get('v.showTabBar'));
            }            
        }
            
    }
    
})