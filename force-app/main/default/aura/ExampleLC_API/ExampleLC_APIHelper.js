({
    getBase64: function(file) {
        return new Promise($A.getCallback(function(resolve, reject){
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(){
                let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
                if ((encoded.length % 4) > 0) {
                    encoded += '='.repeat(4 - (encoded.length % 4));
                }
                resolve(encoded);
            };
            reader.onerror = function(error){
                reject(error)
            };
        }))
    },
    getBlob: function(str){
    	return this.b64toBlob(this.utf8_to_b64(str));
	},
    utf8_to_b64:function ( str ) {
        return window.btoa(unescape(encodeURIComponent( str )));
    },
    b64toBlob: function(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;
        
        var byteCharacters = atob(b64Data);
        var byteArrays = [];
        
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            
            var byteArray = new Uint8Array(byteNumbers);
            
            byteArrays.push(byteArray);
        }
        
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }
})