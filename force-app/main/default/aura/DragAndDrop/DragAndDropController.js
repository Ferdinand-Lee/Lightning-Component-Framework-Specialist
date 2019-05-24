({
    doInit: function(component, event, helper) {
        var action = component.get("c.getKanbanWrap");
        action.setParams({
            "objName":component.get("v.objName"),
            "objFields":component.get("v.objFields"),
            "kanbanField":component.get("v.kanbanPicklistField")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.dir(response.getReturnValue());
                component.set("v.kanbanData", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    doView: function(component, event, helper) {
        var editRecordEvent = $A.get("e.force:navigateToSObject");
        editRecordEvent.setParams({
            "recordId": event.target.id
        });
        editRecordEvent.fire();
    },
    
    
    drag: function (component, event, helper) {
        var data = event.target.id;
        console.log('drag', data);
        event.dataTransfer.setData("text/plain", data);
        event.dataTransfer.dropEffect = "move"
        
        component.sourceEl = null;
        if(!$A.util.isEmpty(data)){
            component.sourceEl = document.getElementById(data);
        }      
    },
    
    allowDrop: function(component, event, helper) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move"
    },
    drop: function (component, event, helper) {
        event.preventDefault();        
        if(!component.sourceEl) return;
        component.sourceEl = null;
                
        var data = event.dataTransfer.getData("text");
        console.log('drop', data);
        var tar = event.target;
        while(tar.tagName != 'ul' && tar.tagName != 'UL')
            tar = tar.parentElement;
        if(tar.getElementsByTagName('li').length == 0) tar.appendChild(document.getElementById(data));
        console.log('aaaaaaaaaaaaa   :   ' + tar.getAttribute('data-Pick-Val'));
        document.getElementById(data).style.backgroundColor = "rgb(250, 255, 189)";
        helper.updatePickVal(component,data,component.get("v.kanbanPicklistField"),tar.getAttribute('data-Pick-Val'));
    },
    dragEnter: function(component, event, helper){      
        console.log('dragEnter')
        var tar = event.target;
        if(component.sourceEl && component.sourceEl != tar && tar != tar.parentElement.firstChild){            
            while(tar.tagName != 'LI' && tar.tagName != 'li')
                tar = tar.parentElement;
           	tar.parentElement.insertBefore(component.sourceEl, tar)
        }
    },
    dragLeave: function(component, event, helper){
        console.log('dragLeave')
        var tar = event.target;
        if(component.sourceEl && component.sourceEl != tar){            
            while(tar.tagName != 'LI' && tar.tagName != 'li')
                tar = tar.parentElement;           	
            if(event.target == tar.parentElement.lastChild){
                tar.parentElement.appendChild(component.sourceEl)
            }else{
                var next = tar.nextSibling;
                if(next){
                    tar.parentElement.insertBefore(component.sourceEl, next)
                }
            }            
        }
    }
})