({
    onLoad : function(component, event, helper) {
       let pageInfo= component.get('v.pageReference');
       let counterInfo = pageInfo.state.c__counter;
       component.set('v.counterAtAura', counterInfo);
    }
})