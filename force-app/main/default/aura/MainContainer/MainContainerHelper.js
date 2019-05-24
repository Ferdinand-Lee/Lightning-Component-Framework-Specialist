({
	getTreeData : function() {
		return [{
            "label": "Western Sales Director",
            "name": "1",
            "items": [{
                "label": "Western Sales Manager",
                "name": "2",
                "items" :[{
                    "label": "CA Sales Rep",
                    "name": "3",
                    "items" :[]
                },{
                    "label": "OR Sales Rep",
                    "name": "4",
                    "items" :[]
                }]
            }]
        }, {
            "label": "Eastern Sales Director",
            "name": "5",
            "items": [{
                "label": "Easter Sales Manager",
                "name": "6",
                "items" :[{
                    "label": "NY Sales Rep",
                    "name": "7",
                    "items" :[]
                }, {
                    "label": "MA Sales Rep",
                    "name": "8",
                    "items" :[]
                }]
            }]
        }, {
            "label": "International Sales Director",
            "name": "9",
            "items": [{
                "label": "Asia Sales Manager",
                "name": "10",
                "items" :[{
                    "label": "Sales Rep1",
                    "name": "11",
                    "items" :[{
                        "label": "20",
                        "name": "20",
                        "items" :[{
                            "label": "21",
                            "name": "21",
                            "items" :[{
                                "label": "22",
                                "name": "22",
                                "items" :[]
                            },{
                                "label": "23",
                                "name": "23",
                                "items" :[]
                            }]
                        }]
                    }]
                }, {
                    "label": "Sales Rep2",
                    "name": "12",
                    "items" :[]
                }]
            },{
                "label": "Europe Sales Manager",
                "name": "13",
                "items" :[{
                    "label": "Sales Rep1",
                    "name": "14",
                    "items" :[]
                }, {
                    "label": "Sales Rep2",
                    "name": "15",
                    "items" :[]
                }]
            },{
                "label": "My Node",
                "name": "16",
                "items" :[]
            }]
        }];
	},
    getDynamicInputConfig: function(){
        return [
             {
                "name": "name",
                "label": "姓名",
                "type": "text",
                "component": "input",
                "isChangeNotify": true,
                "editable": true,
                "layoutSize": 4
            },
            {
                "name": "Description",
                "label": "描述",
                "type": "text",
                "component": "textarea",
                "isChangeNotify": false,
                "editable": true,
                "layoutSize": 4
            },
            {
                "name": "startDate",
                "label": "开始日期",
                "type": "date",
                "component": "input",
                "isChangeNotify": true,
                "editable": true,
                "layoutSize": 4
            },
            {
                "name": "startDateOpt",
                "label": "选择",
                "type": "text",
                "component": "select",
                "isChangeNotify": true,
                "editable": true,
                "layoutSize": 2,
                "options": [
                    {
                        "value": "AM",
                        "text": "上午"
                    },
                    {
                        "value": "PM",
                        "text": "下午"
                    }
                ]                                   
            }
        ]
    }
})