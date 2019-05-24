({
	onBoatClick: function(component, event, helper) {
		var selectEvent = component.getEvent("boatSelect")
        selectEvent.setParams({
            boatId: component.get("v.boat").Id
        })
        selectEvent.fire();
        var appEvent = $A.get("e.c:BoatSelected");
        appEvent.setParams({
            boat: component.get("v.boat")
        })
        appEvent.fire();
        var mapEvent = $A.get("e.c:PlotMapMarker");
        mapEvent.setParams({
            sObjectId: component.get('v.boat').Id,            
            lat: component.get('v.boat.Geolocation__Latitude__s'), 
            long: component.get('v.boat.Geolocation__Longitude__s'),
            label: component.get('v.boat').Name
        });
        mapEvent.fire();
	}
})