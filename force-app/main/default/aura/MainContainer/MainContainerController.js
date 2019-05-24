({
	onInit: function (cmp, event, helper) {
        var actions = [
            { label: 'Show details', name: 'show_details' },
            { label: 'Edit', name: 'edit' }
        ], 
        fetchData = {
            name : 'company.bsBuzz',
            author: 'name.findName',
            published : 'address.state'
        };


        cmp.set('v.columns', [
            { label: 'Name', fieldName: 'name', type: 'text', editable: true,style:{color:{green:'published=published', red:'published=not published'}}  },
            { label: 'Author', fieldName: 'author', type: 'text', editable: true },
            { label: 'Name', fieldName: 'A', type: 'text', editable: true },
            { label: 'Name', fieldName: 'B', type: 'text', editable: true },
            { label: 'Name', fieldName: 'C', type: 'text', editable: true },
            { label: 'Name', fieldName: 'D', type: 'text', editable: true },
            { label: 'Publishing State', fieldName: 'published', type: 'text' },
            { label: 'Operation', type: 'action', typeAttributes: { rowActions: actions } }
        ]);
        
        
		cmp.set('v.data', [{
                    id: 'myIdA',
                    name: 'Cloudhub',
                    A: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    B: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
                    C: 'ddddddddddddddddddddddddddddddddd',
                    D: 'cc',
                    author: 'author',
            		published: 'published'
                },
                {
                    id: 'myIdB',
                    name: 'Cloudhub',
                    A: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    B: 'bbbbbbbbbbbbbbbbxbbbbbbbbbbbbbbbb',
                    C: 'ddddddddddddddddddddddddddddddddd',
                    D: 'ccxxxxxxxxxxxxxxxxxxxxxxxxx',
                    author: 'author',
            		published: 'not published'
            },{
                    id: 'myIdC',
                    name: 'Cloudhub',
                    A: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    B: 'bbbbbbbbbbbbbbbbxbbbbbbbbbbbbbbbb',
                    C: 'ddddddddddddddddddddddddddddddddd',
                    D: 'ccxxxxxxxxxxxxxxxxxxxxxxxxx',
                    author: 'author',
            		published: 'not published'
            },{
                    id: 'myIdD',
                    name: 'Cloudhub',
                    A: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                    B: 'bbbbbbbbbbbbbbbbxbbbbbbbbbbbbbbbb',
                    C: 'ddddddddddddddddddddddddddddddddd',
                    D: 'ccxxxxxxxxxxxxxxxxxxxxxxxxx',
                    author: 'author',
            		published: 'not published'
            }]);
        cmp.set('v.selectedRows', ['myIdB']);
        
        cmp.set('v.records',[{name:'A'},{name:'B'},{name:'C'}]);        
        cmp.set('v.tabs', [{name: 'A', id: 't0'},{name: 'B', id: 't1'},{name: 'C', id: 't2'}]);
        cmp.set('v.items', helper.getTreeData())
        cmp.set('v.dynamicInputConfig', helper.getDynamicInputConfig())
    },
    handleSave: function (cmp, event) {
        var draftValues = event.getParam('draftValues');
        console.log(draftValues)
        var data = cmp.get('v.data');
        var newData = data.map(function(item){
            return Object.assign({}, item, draftValues.find(function(d){
                return d.id == item.id;
            })||{});
        })
        console.log(newData);
        cmp.set('v.data', newData);
		cmp.find('dt').set('v.draftValues',  null)
    },
    oncancel: function(cmp, event){
        
    },
    oncellchange: function(cmp, event){
        
    },
    onrowselection: function(cmp, event){
    	console.log(JSON.stringify(event.getParams('selectedRows')));	 
    },
    onSetFilter: function(cmp, event){        
    	cmp.set('v.filter', 'id=myIdA');
    },
    toggleHideCheckboxColumn: function(cmp, event){    	
    	cmp.set('v.hideCheckboxColumn', !cmp.get('v.hideCheckboxColumn'));
    },
    getSelectedRows: function(cmp, event){
      	var rows = cmp.find('mydt').getSelectedRows();  
        alert(JSON.stringify(rows));
    },
    handleRowAction: function (cmp, event, helper) {
        console.log(JSON.stringify(event.getParams()));
        var action = event.getParam('action');
        var row = event.getParam('row');

        switch (action.name) {
            case 'show_details':
                alert('Showing Details: ' + JSON.stringify(row));
                break;
            case 'edit':
                var editRecordEvent = $A.get("e.force:editRecord");
                editRecordEvent.setParams({
                     "recordId": '006f400000CziYwAAJ'
               	});
                editRecordEvent.fire();
                break;
        }
    },
    handleSaveSuccess: function (cmp, event, helper) {
        console.log('ss')
    },
    checkValue:function(cmp, event, helper){
        alert(cmp.get('v.records').filter(r=>r.checked).map(r=>r.name));
    },
    newTab:function(cmp, event, helper){
        var tabs = cmp.get('v.tabs');
        var id = 't' + tabs.length;
        tabs.push({name: 'new', id: id});
        cmp.set('v.tabs', tabs);
        
        setTimeout($A.getCallback(function(){
            cmp.find('tabs').set('v.selectedTabId', id)
        }));
    },
    printItems: function(cmp, event, helper){
        console.log(cmp.get('v.items'));
        console.log(cmp.get('v.selectItems'));
        console.log(cmp.find('treeSelect').getSelectedItems());
        console.log(cmp.find('treeSelect').get('v.selectedItems'));
    },
    setDynamicInput: function(cmp, event, helper){
        cmp.set('v.dynamicInputData', {name: 'dynamic name'});  
    },
    printDynamicInput: function(cmp, event, helper){
        console.log(JSON.stringify(cmp.get('v.dynamicInputData')));
    },
    onDynamicInputChange:function(cmp, event, helper){
        console.log(JSON.stringify(event.getParams()));
        cmp.set('v.dynamicInputData', event.getParam('data'));
    },
    toggleTransitionShow: function(cmp, event, helper){
        cmp.set('v.transitionShow', !cmp.get('v.transitionShow'));
    }
})