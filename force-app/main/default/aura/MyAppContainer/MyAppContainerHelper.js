({
    parseURL: function(url) {
        var a =  document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':',''),
            host: a.hostname,
            port: a.port||'80',
            query: a.search,
            params: (function(){
                var ret = {},
                    seg = a.search.replace(new RegExp('^\\?') ,'').split('&'),
                    len = seg.length, i = 0, s;
                for (;i<len;i++) {
                    if (!seg[i]) { continue; }
                    s = seg[i].split('=');
                    ret[s[0]] = s[1];
                }
                return ret;
            })(),
            file: (a.pathname.match(new RegExp('\\/([^\\\\/?#]+)$','i')) || [,''])[1],
            hash: a.hash.replace('#',''),
            path: a.pathname.replace(new RegExp('^([^\\\\/])'),'/$1'),
            relative: (a.href.match(new RegExp('tps?:\\\\/\\\\/[^\\\\/]+(.+)')) || [,''])[1],
            segments: a.pathname.replace(new RegExp('^\\\\/'),'').split('/')
        };
    },
    navigate: function(component, page, params) {
        var helper = this;
		var stateRef = component.getReference('v.state');
        var state = component.get('v.state');

        helper.toggleLoading(component, true);
        
        var filters = [];
        // check authentication
        filters.push(function(next){
            return function(cmp){
                if(cmp.get('v.isAuthRequired') && !state.user.isAuthenticated){
                    var loginPage = component.get('v.loginPage');
                    $A.createComponent(loginPage, {state: stateRef, successPage: page, successParams: params}, function(loginCmp, loginCmpStatus){
                        if(loginCmpStatus === "SUCCESS"){
                            next(loginCmp)
                        }else{
                            helper.gotoError(component, {
                                errorMessage: `Create component failed: ${loginPage}`
                            })
                        }
                    })
                }else{
                    next(cmp);
                }                
            }
        });
        // check authorization
        filters.push(function(next){
            return function(cmp){
                var roles = cmp.get('v.roles');
                if(!$A.util.isEmpty(roles)){
                    if($A.util.isEmpty(state.user.roles) || 
                       !roles.every(function(role){
                           return state.user.roles.includes(role)
                       })){
                       helper.gotoError(component, {
                           errorMessage: `Not authorized, need roles ${roles}, has ${state.user.roles}`
                    	})
                    }else{
                        next(cmp)
                    }
                }else{
                    next(cmp)
                }
            }
        })
        
        filters.push(function(next){
            return function(cmp){
                if(!cmp.isInstanceOf(component.get('v.loginPage'))) helper.addHistory(component, cmp);
                next(cmp);
            }
        })        
        filters.push(function(next){
            return function(cmp){
                helper.resetTabBar(component, cmp);                                    
                next(cmp);
            }
        })
        
        function compose(funcs){
            if(funcs.length === 0) {
            	return arg => arg
            }
            if(funcs.length === 1) {
                return funcs[0]
            }            
        	return funcs.reduce((a, b) => (...args) => a(b(...args)))
        }
        $A.createComponent(page, Object.assign({}, {state: stateRef}, params), function(cmp, status){
            if(status === "SUCCESS"){
                compose(filters)(function(cmp){
                    component.set('v.view', cmp);                	
                })(cmp); 
                helper.toggleLoading(component, false)
            }else{
                helper.gotoError(component, {
                    errorMessage: `Create component failed: ${page}`
                })
            }
        })
	},
    addHistory: function(component, cmp){
        cmp.autoDestroy(false)
        var pageStack = component.get('v.pageStack');
        var tabBar = component.get('v.tabBar');
        var tabBarPages = [];
        if(tabBar && tabBar.list){
            tabBarPages = tabBar.list.map(function(bar){
                return bar.pageName;
            })
        }
        if(tabBarPages.includes(cmp.getType())){
            pageStack.forEach(function(cmp){
                cmp.destroy();
            })
            pageStack = [];
        }   
        pageStack.push(cmp);
        component.set('v.pageStack', pageStack);
    },
    resetTabBar: function(component, cmp){
        if(cmp.isInstanceOf('c:MyPageComponent') || !$A.util.isUndefinedOrNull(cmp.get('v.showTabBar'))){
            component.set('v.showTabBar', cmp.get('v.showTabBar'));
        }
    },
    getErrorPage: function(errorMessage, error){
        return new Promise(function(resolve){
            $A.createComponent('c:MyErrorPage', {errorMessage:errorMessage, error:error}, function(cmp, status){
                if(status === "SUCCESS"){
                    resolve(cmp);
                }
            })
        })
    }
})