namespace Map.Models.Response
{
    public class CustomerInformation
    {
        public int Id { get;}
        public string Name { get; }
        public string Address { get; }
        public double LocationLongitude { get; }
        public double LocationLatitude { get; }

        public CustomerInformation(string name, string address, double locationLongitude, double locationLatitude, int id)
        {
            Name = name;
            Address = address;
            LocationLongitude = locationLongitude;
            LocationLatitude = locationLatitude;
            Id = id;
        }
    }
}
