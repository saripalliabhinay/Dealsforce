public with sharing class DependentPicklist {
    public DependentPicklist() {

    }

public static Map<Object,List<String>> getDependentPicklistValues(Schema.sObjectField dependentField){
        Map<Object,List<String>> dependentPicklistValues = new Map<Object,List<String>>();
		//Get dependent field result
        Schema.DescribeFieldResult dependentFieldResult = dependentField.getDescribe();
		//Get dependent field controlling field 
        Schema.sObjectField controllerField = dependentFieldResult.getController();
		//Check controlling field is not null
        if(controllerField == null){
            return null;
        } 
		//Get controlling field result
        Schema.DescribeFieldResult controllerFieldResult = controllerField.getDescribe();
		//Get controlling field picklist values if controlling field is not a checkbox
        List<Schema.PicklistEntry> controllerValues = (controllerFieldResult.getType() == Schema.DisplayType.Boolean ? null : controllerFieldResult.getPicklistValues());
        
		//It is used to decode the characters of the validFor fields. 
        String base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        
        for (Schema.PicklistEntry entry : dependentFieldResult.getPicklistValues()){
            if (entry.isActive()){
			//The PicklistEntry is serialized and deserialized using the Apex JSON class and it will check to have a 'validFor' field
                List<String> base64chars = String.valueOf(((Map<String,Object>)JSON.deserializeUntyped(JSON.serialize(entry))).get('validFor')).split('');
                for (Integer i = 0; i < controllerValues.size(); i++){
                    Object controllerValue = (controllerValues == null ? (Object) (i == 1) : (Object) (controllerValues[i].isActive() ? controllerValues[i].getLabel() : null));
                    Integer bitIndex = i / 6;
                    Integer bitShift = 5 - Math.mod(i, 6 );
                    if(controllerValue == null || (base64map.indexOf(base64chars[bitIndex]) & (1 << bitShift)) == 0){
                        continue;
                    } 
                    if (!dependentPicklistValues.containsKey(controllerValue)){
                        dependentPicklistValues.put(controllerValue, new List<String>());
                    }
                    dependentPicklistValues.get(controllerValue).add(entry.getLabel());
                }
            }
        }
        return dependentPicklistValues;
    }

    public static Map<String, List<String>> getDependentOptionsImpl(Schema.SObjectField theField, Schema.SObjectField ctrlField) {
		// validFor property cannot be accessed via a method or a property,
		// so we need to serialize the PicklistEntry object and then deserialize into a wrapper.
		List<Schema.PicklistEntry> contrEntries = ctrlField.getDescribe().getPicklistValues();
		List<PicklistEntryWrapper> depEntries =
        DependentPicklist.wrapPicklistEntries(theField.getDescribe().getPicklistValues());

		// Set up the return container - Map<ControllingValue, List<DependentValues>>
		Map<String, List<String>> objResults = new Map<String, List<String>>();
		List<String> controllingValues = new List<String>();

		for (Schema.PicklistEntry ple : contrEntries) {
			String label = ple.getLabel();
			objResults.put(label, new List<String>());
			controllingValues.add(label);
		}

		for (PicklistEntryWrapper plew : depEntries) {
			String label = plew.label;
			String validForBits = base64ToBits(plew.validFor);
			for (Integer i = 0; i < validForBits.length(); i++) {
				// For each bit, in order: if it's a 1, add this label to the dependent list for the corresponding controlling value
				String bit = validForBits.mid(i, 1);
				if (bit == '1') {
					objResults.get(controllingValues.get(i)).add(label);
				}
			}
		}

		return objResults;
	}

	// Convert decimal to binary representation (alas, Apex has no native method :-(
	//    eg. 4 => '100', 19 => '10011', etc.
	// Method: Divide by 2 repeatedly until 0. At each step note the remainder (0 or 1).
	// These, in reverse order, are the binary.
	public static String decimalToBinary(Integer val) {
		String bits = '';
		while (val > 0) {
			Integer remainder = Math.mod(val, 2);
			val = Integer.valueOf(Math.floor(val / 2));
			bits = String.valueOf(remainder) + bits;
		}
		return bits;
	}

	// Convert a base64 token into a binary/bits representation
	// e.g. 'gAAA' => '100000000000000000000'
	public static String base64ToBits(String validFor) {
		if (String.isEmpty(validFor)) return '';

		String validForBits = '';

		for (Integer i = 0; i < validFor.length(); i++) {
			String thisChar = validFor.mid(i, 1);
			Integer val = base64Chars.indexOf(thisChar);
			String bits = decimalToBinary(val).leftPad(6, '0');
			validForBits += bits;
		}

		return validForBits;
	}


	private static final String base64Chars = '' +
			'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
			'abcdefghijklmnopqrstuvwxyz' +
			'0123456789+/';


	private static List<PicklistEntryWrapper> wrapPicklistEntries(List<Schema.PicklistEntry> PLEs) {
		return (List<PicklistEntryWrapper>)
			JSON.deserialize(JSON.serialize(PLEs), List<PicklistEntryWrapper>.class);
	}

	public class PicklistEntryWrapper {
		public String active {get; set;}
		public String defaultValue {get; set;}
		public String label {get; set;}
		public String value {get; set;}
		public String validFor {get; set;}
	}
}