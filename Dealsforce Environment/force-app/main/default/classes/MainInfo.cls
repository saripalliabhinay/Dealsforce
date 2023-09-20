public class MainInfo {
    public England_and_wales England_and_wales;
    public class England_and_wales {
		public String division {get;set;} 
		public List<Events> events {get;set;} 
    }
    
    public class Events {
		public String title {get;set;} 
		public String notes {get;set;} 
		public Boolean bunting {get;set;} 
    }
}