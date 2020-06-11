using CopaFilmes.Controllers;
using CopaFilmes.Entities;
using CopaFilmes.Exceptions;
using CopaFilmes.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using Xunit;

namespace CopaFilmesTests.Controllers
{
    public class CampeonatoControllerTests
    {

        private static readonly List<Filme> filmes = new List<Filme>()
        {
            new Filme()
            {
                Id = "tt4154756",
                Ano = 2018,
                Nota = 8.8M,
                Titulo = "Vingadores: Guerra Infinita"
            },

            new Filme()
            {
                Id = "tt3606756",
                Ano = 2018,
                Nota = 8.5M,
                Titulo = "Os Incríveis 2"
            },
            new Filme()
            {
                Id = "tt4881806",
                Ano = 2018,
                Nota = 6.7M,
                Titulo = "Jurassic World: Reino Ameaçado"
            },
            new Filme()
            {
                Id = "tt5164214",
                Ano = 2018,
                Nota = 6.3M,
                Titulo = "Oito Mulheres e um Segredo"
            },
            new Filme()
            {
                Id = "tt7784604",
                Ano = 2018,
                Nota = 7.8M,
                Titulo = "Hereditário"
            },
            new Filme()
            {
                Id = "tt5463162",
                Ano = 2018,
                Nota = 8.1M,
                Titulo = "Deadpool 2"
            },
            new Filme()
            {
                Id = "tt3778644",
                Ano = 2018,
                Nota = 7.2M,
                Titulo = "Han Solo: Uma História Star Wars"
            },
            new Filme()
            {
                Id = "tt3501632",
                Ano = 2017,
                Nota = 7.9M,
                Titulo = "Thor: Ragnarok"
            }
        };

        [Fact]
        public void GerarCampeonato_Retornar500InternalServerError()
        {
            // Arrange
            var campeonatoServiceMock = new Mock<ICampeonatoService>();
            campeonatoServiceMock.Setup(serv => serv.GerarCampeonato(filmes))
                .Throws(new Exception());

            var controller = new CampeonatoController(campeonatoServiceMock.Object);

            // Act
            var result = controller.GerarCampeonato(filmes);

            // Assert
            var objectResult = result as ObjectResult;
            objectResult.StatusCode.Should().Be(500);
        }

        [Fact]
        public void GerarCampeonato_Retornar400BadRequest_FilmesInvalidos()
        {
            // Arrange
            var campeonatoServiceMock = new Mock<ICampeonatoService>();
            campeonatoServiceMock.Setup(serv => serv.GerarCampeonato(null))
                .Throws(new FilmesInvalidosException("A lista de filmes não está no formato correto."));

            var controller = new CampeonatoController(campeonatoServiceMock.Object);

            // Act
            var result = controller.GerarCampeonato(null);

            // Assert
            var objectResult = result as ObjectResult;
            objectResult.StatusCode.Should().Be(400);
            objectResult.Value.Should().Be("Erro ao gerar campeonato: A lista de filmes não está no formato correto.");
        }

        [Fact]
        public void GerarCampeonato_Retornar400BadRequest_QuantidadeInvalida()
        {
            // Arrange
            var campeonatoServiceMock = new Mock<ICampeonatoService>();
            campeonatoServiceMock.Setup(serv => serv.GerarCampeonato(null))
                .Throws(new QuantidadeInvalidaException("É necessário selecionar exatamente 8 filmes para começar o campeonato."));

            var controller = new CampeonatoController(campeonatoServiceMock.Object);

            // Act
            var result = controller.GerarCampeonato(null);

            // Assert
            var objectResult = result as ObjectResult;
            objectResult.StatusCode.Should().Be(400);
            objectResult.Value.Should().Be("Erro ao gerar campeonato: É necessário selecionar exatamente 8 filmes para começar o campeonato.");
        }

        [Fact]
        public void GerarCampeonato_Retornar200OK()
        {
            // Arrange
            var campeonatoServiceMock = new Mock<ICampeonatoService>();
            campeonatoServiceMock.Setup(serv => serv.GerarCampeonato(CampeonatoControllerTests.filmes))
                .Returns(GetListaFilmes());

            var controller = new CampeonatoController(campeonatoServiceMock.Object);

            // Act
            var result = controller.GerarCampeonato(CampeonatoControllerTests.filmes);

            // Assert
            var okResult = result as OkObjectResult;
            okResult.StatusCode.Should().Be(200);

            var filmes = okResult.Value as object;
            filmes.Should().BeEquivalentTo(new { Primeiro = CampeonatoControllerTests.filmes[0], Segundo = CampeonatoControllerTests.filmes[1] });
        }

        private Dictionary<Filme, Filme> GetListaFilmes()
        {
            var dicFilmes = new Dictionary<Filme, Filme>();

            Filme primeiroLugar = new Filme()
            {
                Id = "tt4154756",
                Ano = 2018,
                Nota = 8.8M,
                Titulo = "Vingadores: Guerra Infinita"
            };

            Filme segundoLugar = new Filme()
            {
                Id = "tt3606756",
                Ano = 2018,
                Nota = 8.5M,
                Titulo = "Os Incríveis 2"
            };

            dicFilmes.Add(primeiroLugar, segundoLugar);

            return dicFilmes;
        }

    }
}
