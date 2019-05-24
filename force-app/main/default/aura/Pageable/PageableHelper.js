({
    initPage: function(component){
        var records = component.get('v.records');
        var pageSize = component.get('v.pageSize');
        var size = $A.util.isUndefinedOrNull(records) ? 0 : (records.length || 0)
        var totalPages = Math.floor((size + pageSize - 1) / 10);
        component.set('v.pageRecords', records.slice(0, pageSize));
        component.set('v.totalPages', totalPages);
        component.set('v.currentPage', 1);
        this.resetButtons(component, 1);
        this.setPageValue(component, 1)
    },
	resetButtons : function(component, currentPage) {
        var totalPages = component.get('v.totalPages');
		component.set('v.isFirstEnabled', currentPage > 1);
        component.set('v.isLastEnabled', currentPage < totalPages);
		component.set('v.hasPre', currentPage > 1);
        component.set('v.hasNext', currentPage < totalPages);
	},
    setPageValue:function(component, currentPage){
        var pageSize = component.get('v.pageSize');
        var records = component.get('v.records');
        component.set('v.pageRecords', records.slice((currentPage - 1) * pageSize,currentPage * pageSize));
    }
})