({
    reset:function(component, event, helper){
        var data = component.get('v.data');
        var keyField = component.get('v.keyField');            
        if(data && keyField){                
            var selectedRows = component.get('v.selectedRows');      	
            var filteredData = data.map(function(row){
                return {$source:row, $checked:false};
            });
            var filter = component.get('v.filter');
            var hideCheckboxColumn = component.get('v.hideCheckboxColumn');
            if(filter){
                filteredData = filteredData.filter(function(row){
                    return helper.conditionMatch(filter, row.$source);
                })
            }
            if(!hideCheckboxColumn){
                filteredData.forEach(function(row, index){
                    if(selectedRows && selectedRows.find(function(selectedRow){
                        return selectedRow == row.$source[keyField];
                    })){
                        row.$checked = true;
                    }
                    
                })
            }            
            component.set('v.filteredData', filteredData);
        }
    },
    getCheckboxs: function(component){
    	var checkboxs = component.find('checkbox');
        if(checkboxs){
            checkboxs = $A.util.isArray(checkboxs) ? checkboxs : [checkboxs];
        }else{  
        	checkboxs = [];
        }
        return checkboxs;
    },
    fireRowSelection: function(component, filteredData){
        var rowselectionAction = component.getEvent("onrowselection");
        rowselectionAction.setParams({
            selectedRows:filteredData.filter(row => row.$checked).map(row => row.$source)
        });
        rowselectionAction.fire();
    },
    fireRowaction: function(component, row, action){
        var rowaction = component.getEvent("onrowaction");
        rowaction.setParams({
            row: row,
            action: action
        });
        rowaction.fire();
    },
	conditionMatch: function(condition, data) {
        var priority = {'(' : 3, 'AND' : 2, 'OR' : 1, ')' : 0};
        function getReversePolishNotation(condition){;
            var operatorStake = new Array();
            var conditionArr = condition.match(/\w+|OR|AND|\(|\)/g);
            //console.log('conditionArr', conditionArr);
            return conditionArr.reduce(function(result, str){
                if(str in priority){
                    if(str == '('){
                        operatorStake.push(str);
                    }else if(str == ')'){
                        while(operatorStake.length > 0) {
                            var temp = operatorStake.pop();
                            if(temp != '('){
                                result.push(temp);
                            }else{
                                break;
                            }
                        }
                    }else {
                        if(operatorStake > 0){
                            var top = operatorStake.slice(-1);
                            if(top != '(' && priority[top] > priority[str]){
                                result.push(operatorStake.pop());
                            }       
                        }
                        operatorStake.push(str)
                    }
                }else{
                    result.push(str);
                } 
                return result;
            }, new Array()).concat(operatorStake);
        }

        function evaluate(erversePolish){
            //console.log('erversePolish', erversePolish);
            var stake = new Array();
            for(var i = 0; i< erversePolish.length; i++){
                var str = erversePolish[i];
                if(str in priority){
                    var b1 = stake.pop().toString() == 'true';
                    var b2 = stake.pop().toString() == 'true';
                    if(str == 'OR') {
                        stake.push(b1 || b2)
                    }else if(str == 'AND'){
                        stake.push(b1 && b2)
                    }
                }else{
                    stake.push(str)
                }
            }
            return stake.pop().toString() == 'true';
        }

        var conditionExpress = condition.replace(/(\w+)\s?([<!=>]+|includes|include|exclude|contains)\s?([\w,\s.]*)/g, function(str, key, operation, value){
            var dataValue = data[key];
            var result = false
            if($A.util.isUndefinedOrNull(value)  || $A.util.isEmpty(value)) value = '<![CDATA[]]>';
            if($A.util.isUndefinedOrNull(dataValue) || $A.util.isEmpty(dataValue)) dataValue = '<![CDATA[]]>';
            dataValue = dataValue.toString();
            //console.log(dataValue)                    
            switch(operation){
                case '>': return (dataValue > value);
                case '>=': return (dataValue >= value); 
                case '=': return (value == dataValue); 
                case '<': return (dataValue < value); 
                case '<=': return (dataValue <= value); 
                case '<>': 
                case '!=': return (dataValue != value); 
                case 'include':
                case 'contains': return dataValue.includes(value);
                case 'exclude': return !dataValue.includes(value);
                case 'includes': 
                    var dataValueArr = dataValue.split(',');
                    return value.split(',').every(function(item){ return dataValueArr.includes(item)});
                default : return false;
            }
        });
        //console.log(conditionExpress)
        return evaluate(getReversePolishNotation(conditionExpress));
    }
})