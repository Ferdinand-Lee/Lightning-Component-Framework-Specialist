({
    onInit: function(component, event, helper){
    	  helper.initPage(component);
    },
    setRecords: function(component, event, helper){
        var records = event.getParam('arguments').records;
        component.set('v.records', [...records]);
        //helper.initPage(component);
    },
    firstPage: function(component, event, helper){
       component.set('v.currentPage', 1);
    },
	nextPage: function(component, event, helper) {
		var currentPage = component.get('v.currentPage');
        component.set('v.currentPage', currentPage + 1);
	},
    prePage: function(component, event, helper){
        var currentPage = component.get('v.currentPage');
        component.set('v.currentPage', currentPage - 1);
    },
    lastPage: function(component, event, helper){
        component.set('v.currentPage', component.get('v.totalPages'));

    },
    onRecordsChange: function(component, event, helper){
        helper.initPage(component);
    },
    onPageChange: function(component, event, helper){
        var currentPage = event.getParam('value');
        helper.resetButtons(component, currentPage);
        helper.setPageValue(component, currentPage)
    },
    onPagenationClick: function(component, event, helper){
        var page = +(event.getSource().get('v.value'));
        component.set('v.currentPage', page);
    }
})