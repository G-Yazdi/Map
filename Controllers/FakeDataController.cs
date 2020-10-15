using System;
using Map.EndPoints.Service;
using Microsoft.AspNetCore.Mvc;
using SampleReactApp.Models;
using Services.Core.Interfaces;
using Services.WebApiCaller;
using Services.WebApiCaller.Configuration;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Map.EndPoints.Service.Interfaces;
using SampleReactApp.Models.Response;

namespace SampleReactApp.Controllers
{
    [ApiController]
    public class FakeDataController : ControllerBase
    {
        private static IApiCaller _caller;
        private static IApiConfiguration _configuration;
        private static IMapService _mapService;

        [Route("GetLastLocations")]
        [HttpGet]
        public async Task<List<Point>> GetLastLocations()
        {
            _caller = new ApiCaller();
            _configuration = new WebApiConfiguration();
            _mapService = new MapService(_caller, _configuration);

            var locations = await _mapService.ReportService.GetLastLocationsAsync().ConfigureAwait(false);
            var desiredResult = locations.Select(x => new Point(x.Device.ID, x.Device.IMEI, x.Device.Nickname,
                x.Location?.Time, x.Location?.Longitude, x.Location?.Latitude)).ToList();
            return desiredResult;
        }

        [Route("GetBrowsedRoute")]
        [HttpGet]
        public async Task<List<GeographicalPoint>> GetBrowsedRoute(int deviceId, DateTime locationTime)
        {
            _caller = new ApiCaller();
            _configuration = new WebApiConfiguration();
            _mapService = new MapService(_caller, _configuration);

            var startOfDay = locationTime.Date;
            var endOfDay = locationTime.Date.AddDays(1).AddTicks(-1);
            var browsedRoute =
                await _mapService.ReportService.BrowseRoute(deviceId, startOfDay, endOfDay);


            return browsedRoute?.Select(r=>new GeographicalPoint(r.Location.Longitude, r.Location.Latitude)).ToList();
        }
    }
}
