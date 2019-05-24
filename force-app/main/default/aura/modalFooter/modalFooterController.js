({
    handleCancel : function(component, event, helper) {
        //closes the modal or popover from the component
        component.find('notifLib').showNotice({
            "variant": "info",
            "header": "Confirm",
            "message": "You will close dialog.",
            closeCallback: $A.getCallback(function(){
                component.find("overlayLib").notifyClose();
            })
        });
    },
    handleOK : function(component, event, helper) {
        console.log('handleOK', 'fire', component.find('myFooter'))
        var modalEvent = component.getEvent("modalSubmit");       
        modalEvent.fire();
        component.find("overlayLib").notifyClose();
    }
})