﻿using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProbesController : ControllerBase
    {
        private string DaprHttpPort = Environment.GetEnvironmentVariable("DAPR_HTTP_PORT") ?? "3500";
        private ILogger<ProbesController> _logger;
        private HttpClient _httpClient;

        public ProbesController(ILogger<ProbesController> logger, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _httpClient = httpClientFactory.CreateClient();
        }

        [HttpGet("ready")]
        public async Task<IActionResult> IsReady()
        {
            return await Task.FromResult(Ok());
        }

        [HttpGet("healthz")]
        public async Task<IActionResult> IsHealthy()
        {
            var response = await _httpClient.GetAsync($"http://localhost:{DaprHttpPort}/v1.0/healthz");
            return new StatusCodeResult((int)response.StatusCode);
        }
    }
}
