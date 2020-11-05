using System;

namespace Map.Models.Response
{

    public class GeographicalPoint
    {
        public double Longitude { get; }
        public double Latitude { get; }
        public short Speed { get; }
        public DateTime Time { get; }

        public GeographicalPoint(double longitude, double latitude, short speed, DateTime time)
        {
            Longitude = longitude;
            Latitude = latitude;
            Speed = speed;
            Time = time;
        }
    }
}
