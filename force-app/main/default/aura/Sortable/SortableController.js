({
    afterScriptsLoaded : function(component, event, helper) {
        component.getElements().forEach(function(el){
            let needSort = true;
            let config = {
                group: component.get('v.group'),
                sort: component.get('v.sort'),
                delay: component.get('v.delay'),
                touchStartThreshold: component.get('v.touchStartThreshold'),
                disabled: component.get('v.disabled'),
                store: component.get('v.store'),
                animation: component.get('v.animation'),
                handle: component.get('v.handle'),
                filter: component.get('v.filter'),
                preventOnFilter: component.get('v.preventOnFilter'),
                draggable: component.get('v.draggable'),
                ghostClass: component.get('v.ghostClass'),
                chosenClass: component.get('v.chosenClass'),
                dragClass: component.get('v.dragClass'),
                dataIdAttr: component.get('v.dataIdAttr'),
                setData: function (dataTransfer, dragEl) {
                    console.log('setData');
                },
                // Element is chosen
                onChoose: $A.getCallback(function (evt) {
                    console.log('onChoose');
                    let items = component.get('v.items');
                    if(!$A.util.isEmpty(items)){
                        evt.item.$data = items[evt.oldIndex];
                    }
                }),
                // Element dragging started
                onStart: $A.getCallback(function (evt)  {
                    console.log('start', evt.oldIndex, evt.newIndex);                    
                }),
                // Element dragging ended
                onEnd: $A.getCallback(function (evt) {
                    console.log('onEnd', evt.oldIndex, evt.newIndex)                    
                    if(!helper.fireAction(component, 'onEnd', evt)){
                        let items = component.get('v.items');                        
                    }                    
                }),
                onAdd: $A.getCallback(function (evt) {
                    // same properties as onEnd
                    console.log('onAdd', evt.oldIndex, evt.newIndex)
                    if(!helper.fireAction(component, 'onAdd', evt)){
                        let items = component.get('v.items');
                        if(!$A.util.isEmpty(items)){                            
                            items.splice(evt.newIndex, 0, evt.item.$data);
                        }                        
                    }
                    needSort = false;
                }),
                // Changed sorting within list
                onUpdate: function (evt) {
                    // same properties as onEnd
                    console.log('onUpdate', evt.oldIndex, evt.newIndex);
                },
                // Called by any change to the list (add / update / remove)
                onSort: $A.getCallback(function (evt) {
                    // same properties as onEnd
                    console.log('onSort', evt.oldIndex, evt.newIndex)
                    if(!helper.fireAction(component, 'onSort', evt)){
                        let items = component.get('v.items');                         
                        if(!$A.util.isEmpty(items)){
                           //needSort && items.splice(evt.newIndex, 0, ...items.splice(evt.oldIndex, 1));
                           needSort && items.splice(evt.newIndex, 0, items.splice(evt.oldIndex, 1)[0]);                       
                        }
                    }
                    needSort = true;
                }),
                // Element is removed from the list into another list
                onRemove: $A.getCallback(function (evt) {
                    // same properties as onEnd
                    console.log('onRemove', evt.oldIndex, evt.newIndex)
                    if(!helper.fireAction(component, 'onSort', evt)){
                        let items = component.get('v.items');
                        if(!$A.util.isEmpty(items)){                        
                            items.splice(evt.oldIndex, 1);
                        }
                    }
                    needSort = false;
                }),
                // Attempt to drag a filtered element
                onFilter: function (evt) {
                    var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
                },
                // Event when you move an item in the list or between lists
                onMove: function (evt, originalEvent) {
                    // Example: https://jsbin.com/nawahef/edit?js,output
                    evt.dragged; // dragged HTMLElement
                    evt.draggedRect; // TextRectangle {left, top, right и bottom}
                    evt.related; // HTMLElement on which have guided
                    evt.relatedRect; // TextRectangle
                    originalEvent.clientY; // mouse position
                    // return false; — for cancel
                },
                // Called when creating a clone of element
                onClone: function (evt) {
                    var origEl = evt.item;
                    var cloneEl = evt.clone;
                }
            };
            if(!config.draggable) delete config.draggable;
            component.$sortable = Sortable.create(el, config);
        })
    },
    onInit: function(component, event, helper) {
        console.log('init');              
    },
    onDisabledChange: function(component, event, helper) {
        if(component.$sortable){
            component.$sortable.option("disabled", component.get('v.disabled'));
        }
    },
    toArray: function(component, event, helper){
        if(component.$sortable){
            return component.$sortable.toArray();
        }
    },
    doSort: function(component, event, helper){
        let params = event.getParam('arguments');
        if(component.$sortable){
            return component.$sortable.sort(params.value);
        }
    }
})