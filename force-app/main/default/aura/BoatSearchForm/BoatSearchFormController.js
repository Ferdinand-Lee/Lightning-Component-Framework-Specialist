({
    init: function(component, event, helper){
        var showCreate = $A.get("e.force:createRecord") != null;
        component.set('v.showCreate', showCreate);
        var action = component.get('c.getAllTypes');
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.types", response.getReturnValue());
            }
            else if (state === "INCOMPLETE") {
               
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
	createRecord : function(component, event, helper) {
		var createRecordEvent = $A.get("e.force:createRecord");
        var selectedType = component.find("typeSelect").get("v.value") || null;
        console.log(selectedType);
        if(createRecordEvent){
        	createRecordEvent.setParams({
                "entityApiName": "Boat__c",
                "defaultFieldValues": {
                    "BoatType__c": selectedType
                }
            });
            createRecordEvent.fire();   
        }        
	},
    onFormSubmit: function(component, event, helper){
    	var boatTypeId = component.find('typeSelect').get("v.value");
        var submitEvent = component.getEvent("formsubmit");
        submitEvent.setParams({
            formData: {
                boatTypeId: boatTypeId
            }
        });
        submitEvent.fire();
    },
    onModalSubmit:function(component, event, helper){
        var isArray = Array.isArray(component.find('myContent'));
        console.log('onModalSubmit', isArray)
        // 不知道为啥第一次打开是不是数组？？？
        var cmp = isArray ? component.find('myContent')[0]:component.find('myContent');
        console.log('from component', cmp.get('v.value'))
        component.set('v.selectedTypes', cmp.get('v.value'))        
	},
    onOpen:function(component, event, helper){
        var options = component.get('v.types').map(function(t){
            return {'label': t.Name, 'value': t.Id};
        })
        
        var modalBody;
        var modalFooter;
        $A.createComponents([
            ["c:modalContent",{
                "aura:id":"myContent", 
                options:options,
                value:component.get('v.selectedTypes')
            }],
        	["c:modalFooter",{
                "aura:id":"myFooter",
                modalSubmit: component.getReference("c.onModalSubmit")
            }]
    	], 
        function(components, status){
            if(status === "SUCCESS"){
                modalBody = components[0];
            	modalFooter = components[1];
                modalBody.autoDestroy(false); //禁用自动销毁，否则对话框关闭后组件invalid，无法获取属性值
                component.find('overlayLib').showCustomModal({
                    header:"Select Types",
                    body: modalBody, 
               		footer: modalFooter,
                    showCloseButton: true,
                    cssClass:"mymodal",
                    closeCallback: $A.getCallback(function(){
                        console.log(modalBody.get('v.value'))
                        modalBody.destroy();// 对话框关闭后手动销毁，否则下次打开无法设置属性
                        //modalFooter.destroy();                        
                    })
                }).then($A.getCallback(function(modal){
                    console.log(modal)
                    console.log(component.isValid());
                }))
            }
        })
    }
})