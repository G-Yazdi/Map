﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Map.EndPoints.Service;
using Map.EndPoints.Service.Interfaces;
using Map.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Services.Core.Interfaces;
using Services.WebApiCaller;
using Services.WebApiCaller.Configuration;

namespace Map.Controllers
{
    [ApiController]
    public class MapDataController : ControllerBase
    {
        private readonly IApiCaller _caller;
        private readonly IApiConfiguration _configuration;
        private readonly IMapService _mapService;


        public MapDataController()
        {
            _caller = new ApiCaller();
            _configuration = new WebApiConfiguration();
            _mapService = new MapService(_caller, _configuration);
        }

        [Route("GetLastLocations")]
        [HttpGet]
        public async Task<List<Point>> GetLastLocations()
        {
            var locations = await _mapService.ReportService.GetLastLocationsAsync().ConfigureAwait(false);
            var desiredResult = locations?.Select(x => new Point(x.Device.ID, x.Device.IMEI, x.Device.Nickname,
                x.Location?.Time, x.Location?.Longitude, x.Location?.Latitude)).ToList();
            return desiredResult;
        }

        [Route("GetMonitoringMap")]
        [HttpGet]
        public async Task<MonitoringMap> GetMonitoringMap()
        {
            var customers = await _mapService.CustomerService.GetByAreaAsync(1).ConfigureAwait(false);
            var desiredCustomers = customers?.Select(x => new CustomerInformation(x.Name, x.Address, x.Longitude, x.Latitude, x.ID)).ToList();

            var devices = await _mapService.ReportService.GetLastLocationsAsync().ConfigureAwait(false);
            var desiredDevices = devices?.Select(x => new Point(x.Device.ID, x.Device.IMEI, x.Device.Nickname,
                x.Location?.Time, x.Location?.Longitude, x.Location?.Latitude)).ToList();
            return new MonitoringMap(desiredDevices, desiredCustomers);
        }
        [Route("GetDeviceBrowsedPoints")]
        [HttpGet]
        public async Task<DeviceBrowsedPoints> GetBrowsedRoute(int deviceId, DateTime locationTime)
        {
            var startOfDay = locationTime.Date;
            var endOfDay = locationTime.Date.AddDays(1).AddTicks(-1);
            var deviceInfo = await _mapService.DeviceService.GetAsync(deviceId);
            if (deviceInfo is null)
            {
                return null;
            }
            var browsedRoute =
                await _mapService.ReportService.BrowseRoute(deviceId, startOfDay, endOfDay);


            return new DeviceBrowsedPoints(
                browsedRoute?.Select(r => new GeographicalPoint(r.Location.Longitude, r.Location.Latitude, r.Location.Speed, r.Location.Time)).ToList(),
                new DeviceInfo(deviceInfo.ID, deviceInfo.IMEI, deviceInfo.Nickname, deviceInfo.SimNumber));
        }
    }
}
