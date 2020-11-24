using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Map.Controllers
{
    [ApiController]
    public class HostDataController : ControllerBase
    {
        [Route("GetHost")]
        [HttpGet]
        public string GetHost()
        {
            string hostName = HttpContext.Request.Host.ToString();
            return hostName;
        }
    }
}
