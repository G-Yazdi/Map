using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleReactApp.Models.Response
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

        public DeviceInfo(int id, string imei, string nickName)
        {
            Id = id;
            IMEI = imei;
            NickName = nickName;
        }
    }
}
