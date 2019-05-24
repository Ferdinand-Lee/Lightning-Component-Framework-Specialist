({
    jsLoaded: function(component) {
        component.set("v.jsLoaded", true);
    },
    onPlotMapMarker: function(component, event, helper){
        var params = event.getParams();        
        component.set('v.location', {'lat' : params.lat, 'long' : params.long});
        /*
		var id = event.getParam('sObjectId');
    	var latitude = event.getParam('lat');
    	var longitude = event.getParam('long');
    	var label = event.getParam('label');
           
        var leafletMap = helper.getLeafletMap(component, latitude, longitude)
			                   .setView([latitude, longitude], 13);		
        
		L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(leafletMap);
		
		L.marker([latitude, longitude])
         .addTo(leafletMap)
		 .bindPopup(label)
		 .openPopup();
    	*/
    }
})