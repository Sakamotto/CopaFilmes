using CopaFilmes.Entities;
using CopaFilmes.Exceptions;
using CopaFilmes.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CopaFilmes.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampeonatoController : ControllerBase
    {
        private readonly ICampeonatoService _campeonatoService;

        public CampeonatoController(ICampeonatoService campeonatoService)
        {
            _campeonatoService = campeonatoService;
        }

        [HttpPost]
        public IActionResult GerarCampeonato(IEnumerable<Filme> filmes)
        {
            try
            {
                var resultado = _campeonatoService.GerarCampeonato(filmes);

                return Ok(new { Primeiro = resultado.Keys.Single(), Segundo = resultado.Values.Single() });
            }
            catch (FilmesInvalidosException e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, $"Erro ao gerar campeonato: {e.Message}");

            }
            catch (QuantidadeInvalidaException e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, $"Erro ao gerar campeonato: {e.Message}");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao gerar campeonato: {e.Message}");
            }
        }
    }
}
