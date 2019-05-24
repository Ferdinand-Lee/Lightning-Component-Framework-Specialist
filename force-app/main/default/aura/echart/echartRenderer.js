({
	render : function(cmp, helper) {
    	var ret = this.superRender();
    	console.log('render')
   	 	return ret;
	},
    rerender : function(cmp, helper){
        var ret = this.superRerender();
        console.log('rerender');
        
        var node = cmp.find("echart").getElement();
        var chartData = cmp.get('v.chartData');
        
        if(cmp.myChart && chartData){
            var axis = [], data = [], size = 0;
            chartData.forEach(function(item){
                axis.push(item.name);
                size += item.c;
                data.push({value:item.c, name:item.name, _: item});
            })
            cmp.myChart.setOption({
                 title: {
                    text: size,
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',                        
                        fontSize: '50'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    x: 'right',
                    orient: 'vertical',
                    data:axis
                },
                series: [
                    {
                        name:'Boat Type',
                        type:'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                formatter:'{c}'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:data
                    }
                ]
            });
            cmp.myChart.hideLoading();
        }                                
        return ret;
    },
    afterRender: function (component, helper) {
        var ret = this.superAfterRender();
       	console.log('afterRender');
        return ret;
    },
    unrender: function () {
        var ret = this.superUnrender();
        console.log('unrender');
        return ret;
    }
})