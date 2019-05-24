({
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