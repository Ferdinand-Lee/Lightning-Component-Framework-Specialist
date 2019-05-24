/*
Author: Doug Ayers
Website: https://douglascayers.com
GitHub: https://github.com/douglascayers/sfdx-lightning-api
License: BSD 3-Clause License
 */
({
    onDownloadFile: function(component, event, helper){
        return component.find( 'restClient' ).download({});
    },
    onUploadFile: function(component, event, helper){
        let files = component.find('file').get('v.files');
        if(!files.length) return;
        let fileName = files[0].name;
        helper.getBase64(files[0]).then(function(base64){
            return {
                'Title' : fileName,
                'PathOnClient' : fileName,
                'VersionData' : base64,
                'Origin': 'C'
            }
        }).then(function(data){
            return component.find( 'restClient' ).restRequest({
                'url' : '/services/data/v44.0/sobjects/ContentVersion',
                'method' : 'POST',
                'body' : JSON.stringify(data),                
                'headers' : component.get( 'v.requestHeaders' )
            })
        }).then( $A.getCallback( function( response ) {
            component.set( 'v.responseIsError', false );
            component.set( 'v.responseText', JSON.stringify( response, null, 2 ) );
        })).catch( $A.getCallback( function( err ) {
            component.set( 'v.responseIsError', true );
            component.set( 'v.responseText', JSON.stringify( err, null, 2 ) );
        }));
    },
    onSubmitRequestConfirmed: function( component, event, helper ) {
        
        component.set( 'v.responseText', 'please wait...' );
        
        component.find( 'restClient' ).restRequest({
            'url' : component.get( 'v.url' ),
            'method' : component.get( 'v.httpMethod' ),
            'body' : component.get( 'v.requestBody' ),
            'headers' : component.get( 'v.requestHeaders' )
        }).then( $A.getCallback( function( response ) {
            component.set( 'v.responseIsError', false );
            component.set( 'v.responseText', JSON.stringify( response, null, 2 ) );
        })).catch( $A.getCallback( function( err ) {
            component.set( 'v.responseIsError', true );
            component.set( 'v.responseText', JSON.stringify( err, null, 2 ) );
        }));
        
    }
})