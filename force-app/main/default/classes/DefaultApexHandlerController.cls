public class DefaultApexHandlerController {
    @AuraEnabled
	public static Object processApex(String jsonMessages){
        List<Map<String, Object>> result = new List<Map<String, Object>>();
        List<Object> messages = (List<Object>)JSON.deserializeUntyped(jsonMessages);
        for(Object message : messages){
			Map<String, Object> msg = (Map<String, Object>)message;
            if(msg.containsKey('query')){
                List<Sobject> records = Database.query(String.valueOf(msg.get('query')));
                result.add(new Map<String, Object>{
                   'type' => 'store', 'payload' => new List<Object>{ 'v.store.records', records }
                });
                result.add(new Map<String, Object>{
                   'type' => 'store', 'payload' => new List<Object>{ 'v.store.totalCount', records.size() }
                });
            }
        }
		return result;
    }   
}