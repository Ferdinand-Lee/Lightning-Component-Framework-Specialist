({
	onInit : function(component, event, helper) {
        component.setRecords([])
        var records = [];
        for(let i = 0; i < 3000; i++){
            records.push(i);
        }
        //component.setRecords(records)
	},
    addRecords: function(component, evnet, helper){
        var records = component.get('v.records');
        var size = records.length;
        for(let i = size; i < size + 100; i++){
            records.push(i);
        }
        component.setRecords(records)
    }
})