({
    jsLoaded : function(component, event, helper) {
        component.set('v.isLoaded', true);
    },
    export: function(component, event, helper){
        var workbook = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet([
            { S:1, h:2, e:3, e_1:4, t:5, J:6, S_1:7 },
            { S:2, h:3, e:4, e_1:5, t:6, J:7, S_1:8 }
        ], {header:["S","h","e","e_1","t","J","S_1"]});
        XLSX.utils.book_append_sheet(workbook, ws, "Sheet1");
        XLSX.writeFile(workbook, 'test.xlsx');
    },
    exportZip: function(component, event, helper){
        let action = component.get('c.getFileContent');
        action.setCallback(this, function(response){
            var zip = new JSZip();
            zip.file("Hello.txt", "Hello World\n");
            var pdf= zip.folder("pdf");
            pdf.file("abc.pdf", helper.b64toBlob(response.getReturnValue(),'application/pdf'), {base64: true});
            pdf.file("def.pdf", helper.b64toBlob(response.getReturnValue(),'application/pdf'), {base64: true});
            zip.generateAsync({type:"blob"})
            .then(function(content) {
                saveAs(content, "example.zip");
            });
        });
        $A.enqueueAction(action);
    }
})