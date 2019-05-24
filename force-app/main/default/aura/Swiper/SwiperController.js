({
	afterScriptsLoaded : function(component, event, helper) {
        var mySwiper = new Swiper(component.find('swiper').getElement(), {
            autoplay: true,//可选选项，自动滑动
        })
	}
})