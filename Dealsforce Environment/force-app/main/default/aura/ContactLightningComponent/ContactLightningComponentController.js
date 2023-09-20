({
	onLoad : function(component, event, helper) {
		let serverAction = component.get('c.fetchContacts');
        serverAction.setCallback(this,function(response){
            console.log(response.getReturnValue());
        })
        $A.enqueueAction(serverAction);
	}
})