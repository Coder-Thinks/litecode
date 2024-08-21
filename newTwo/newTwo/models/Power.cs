namespace newTwo.NewFolder
{
    public class Power
    {
        public int PowerId { get; set; }    
        public string PowerName { get; set; }
        public DateTime DOB { get; set; }
        public string PanNo { get; set; }

        public int Gender { get; set; } 
        public int CountryId { get; set; }

      //  public IFormFile? FileUpload { get; set; }

        public Country? Country { get; set; }
        public int StateId { get; set; }

        public State? State { get; set; }
        public int CityId { get; set; }

        public City? City { get; set; }
    }
}
