public class OrderDeserializeExample {

    @auraEnabled
    public static Object fetchHolidays(){
        HttpRequest req= new HttpRequest();
        req.setMethod('GET');
        req.setEndpoint('https://www.gov.uk/bank-holidays.json');
        String mockResponse='{"events":[{"title":"New Year’s Day","date":"2018-01-01","notes":"","bunting":true},{"title":"Good Friday","date":"2018-03-30","notes":"","bunting":false}]}ß';
        //req.setContentType('application/json');
            req.setTimeout(120000);
        HttpResponse res = new Http().send(req);
       DataInfo infoList=(DataInfo)JSON.deserialize(res.getBody(),DataInfo.class);
        system.debug('check###'+infoList);
        return null;
    }
    public class DataInfo{
        public MaiInfo check;
    }
    public class MaiInfo{
        public List<CountryInfo> englandandwales;
    }
    
    public class CountryInfo {
        public String division;
        public List<Events> events;
        public CountryInfo(List<Events> events){
            this.events=events;
        }
    }
   
    
    public class Events {
		public String title {get;set;} 
		public String notes {get;set;} 
		public Boolean bunting {get;set;} 
    }
}