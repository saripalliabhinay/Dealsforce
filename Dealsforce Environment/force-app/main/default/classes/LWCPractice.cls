public with sharing class LWCPractice {
    public LWCPractice() {

    }

    @auraEnabled(cacheable=true)
    public static List<ProcessInstance> fetchOnGoingProcess(String objinfo){
        system.debug('objinfo###'+objinfo);
        List<ProcessInstance> procInstance = [Select id,ProcessDefinition.Name,TargetObject.Name,TargetObjectId,Status,ProcessDefinition.TableEnumOrId from ProcessInstance 
                                                WHERE ProcessDefinition.TableEnumOrId = : objinfo];
        system.debug('procInstance###'+procInstance);
        return procInstance;
    }
}