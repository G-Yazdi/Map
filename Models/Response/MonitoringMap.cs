using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleReactApp.Models.Response
{
    public class MonitoringMap
    {
        public List<Point> Devices { get; }
        public List<CustomerInformation> Customers { get; }

        public MonitoringMap(List<Point> devices, List<CustomerInformation> customers)
        {
            Devices = devices;
            Customers = customers;
        }
    }
}
