({
    onInit: function(component, event, helper) {
        component.set('v.items', [1,2,3,4,5]);
    },
    onAlert: function(component, event, helper) {
        alert(JSON.stringify(component.get('v.items')));
    },
    onAddItem: function(component, event, helper) {
        let items = component.get('v.items');
        items.push(items.length + 1);
        component.set('v.items', items);
    },
    onSwitch: function(component, event, helper) {
        component.set('v.disabled', !component.get('v.disabled'));
    },
    toArray: function(component, event, helper) {
        let sortable = component.find('sortable');
        console.log(sortable.toArray());
    },
    doSort: function(component, event, helper) {
        let sortable = component.find('sortable');
        sortable.doSort([3,2,4,5,1]);
    },
    onEnd: function(component, event, helper) {
        return $A.getCallback(function(evt){
            console.log('callback', evt.oldIndex, evt.newIndex);
        })
    }
})