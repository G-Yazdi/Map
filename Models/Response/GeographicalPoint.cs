namespace SampleReactApp.Models.Response
{

    public class GeographicalPoint
    {
        public double Longitude { get; }
        public double Latitude { get; }

        public GeographicalPoint(double longitude, double latitude)
        {
            Longitude = longitude;
            Latitude = latitude;
        }
    }
}
