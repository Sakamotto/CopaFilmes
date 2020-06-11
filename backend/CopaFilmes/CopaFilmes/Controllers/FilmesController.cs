using CopaFilmes.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace CopaFilmes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilmesController : ControllerBase
    {
        private readonly string URL = "https://copafilmes.azurewebsites.net/api/filmes";

        public FilmesController()
        {
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var client = new HttpClient();
                var response = await client.GetAsync(URL);

                var options = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    WriteIndented = true
                };

                var movies = JsonSerializer.Deserialize<IEnumerable<Filme>>(response.Content.ReadAsStringAsync().Result, options);

                return Ok(movies);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao obter lista de filmes: {e.Message}");
            }
        }
    }
}
