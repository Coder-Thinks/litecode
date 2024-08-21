namespace newTwo.NewFolder
{
    public class State
    {
        public int StateId { get; set; }

        public string StateName { get; set; }

        public int CountryId { get; set; }

        public Country Country { get; set; }

        public List<City>? Cities { get; set; }
    }
}
