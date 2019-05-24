({
	jsLoaded : function(component, event, helper) {
		console.log("jsLoaded")
        var node = component.find("echart").getElement();        
        var myChart = echarts.init(node, 'walden');        
        myChart.showLoading();
        component.myChart = myChart;
        myChart.on('click', $A.getCallback(function (params) {
            var action = $A.get("e.c:EChartSelect");
            action.setParams({
                params: params
            })
            action.fire();
        }));
        component.set('v.jsLoaded', true);
	},
  	onInit : function(component, event, helper) {
		console.log("init")        
        var action = component.get('c.getChartData');
        action.setCallback(this, function(result){
            component.set('v.chartData', result.getReturnValue());
            console.log('callback');            
        });
        $A.enqueueAction(action);
	}
})