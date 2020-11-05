using System.Collections.Generic;

namespace Map.Models.Response
{
    public class DeviceBrowsedPoints
    {
        public List<GeographicalPoint> BrowsedPoints { get;}
        public DeviceInfo DeviceInfo { get;}

        public DeviceBrowsedPoints(List<GeographicalPoint> browsedPoints, DeviceInfo deviceInfo)
        {
            BrowsedPoints = browsedPoints;
            DeviceInfo = deviceInfo;
        }
    }

    public class DeviceInfo
    {
        public int Id { get;}
        public string IMEI { get;}
        public string NickName { get;}
        public string SimNumber { get; set; }

        public DeviceInfo(int id, string imei, string nickName, string simNumber)
        {
            Id = id;
            IMEI = imei;
            NickName = nickName;
            SimNumber = simNumber;
        }
    }
}
