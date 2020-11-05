using System;

namespace Map.Models.Response
{

    public class Point
    {
        public int DeviceId { get; set; }
        public string DeviceIMEI { get; set; }
        public string DeviceNickname { get; set; }
        public DateTime? LocationTime { get; set; }
        public double? LocationLongitude { get; set; }
        public double? LocationLatitude { get; set; }

        public Point(int deviceId, string deviceImei, string deviceNickname, DateTime? locationTime, double? locationLongitude, double? locationLatitude)
        {
            DeviceId = deviceId;
            DeviceIMEI = deviceImei;
            DeviceNickname = deviceNickname;
            LocationTime = locationTime;
            LocationLongitude = locationLongitude;
            LocationLatitude = locationLatitude;
        }
    }
}
