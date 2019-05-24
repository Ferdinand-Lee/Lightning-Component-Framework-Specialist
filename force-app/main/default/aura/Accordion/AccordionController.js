({
	init : function(component, event, helper) {        
		var body = component.get('v.body');
        var activeSectionName = component.get('v.activeSectionName');
        
        var sections = body.filter((section)=>{
            return section.isInstanceOf('c:AccordionSection');
        })
        
        var openRef = component.getReference("c.onOpen");
        
        sections.forEach(function(section){
            section.set('v.onOpen', openRef);
        })
        
        var needActive = sections.find(function(section){
            return section.get('v.name') == activeSectionName;
        }) || sections[0];
            
        needActive.set('v.isOpen', true);
            
        component.set('v.sections', sections);
        component.set('v.activeSectionName', needActive.get('v.name'))          
	},
    onActiveSectionName: function(component, event, helper){
    	var sectionName = event.getParam('value');
        var sections = component.get('v.sections');
        sections.forEach(function(section){ 
            var isOpen = sectionName == section.get('v.name');
            section.setOpen(isOpen);           
        })
    },
    onOpen: function(component, event, helper){
        /*
    	var tar = event.target;
        while(tar.tagName != 'BUTTON' && tar.tagName != 'button') 
            tar = tar.parentElement;
        var sectionName = tar.dataset.sectionName;
        component.set('v.activeSectionName', sectionName);
        */
        var btn = event.getSource();
        var sectionName = btn.get('v.name');
        var activeSectionName = component.get('v.activeSectionName');
        if(activeSectionName == sectionName){
            var sections = component.get('v.sections');
            var target = sections.find(function(section){
                return section.get('v.name') == sectionName;
            })
            target.setOpen(!target.get('v.isOpen'))
        }else{
         	component.set('v.activeSectionName', sectionName);   
        }        
    }
})