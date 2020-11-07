using System;

namespace Map.Models.Response
{

    public class GeographicalPoint
    {
        public double Lng { get; }
        public double Lat { get; }
        public short Speed { get; }
        public DateTime Time { get; }

        public GeographicalPoint(double longitude, double latitude, short speed, DateTime time)
        {
            Lng = longitude;
            Lat = latitude;
            Speed = speed;
            Time = time;
        }
    }
}
