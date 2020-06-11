using CopaFilmes.Entities;
using CopaFilmes.Exceptions;
using CopaFilmes.Services;
using FluentAssertions;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace CopaFilmesTests.Services
{
    public class CampeonatoServiceTests
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
        public void GerarCampeonato_FilmesInvalidos()
        {
            var service = new CampeonatoService();

            Assert.Throws<FilmesInvalidosException>(() => service.GerarCampeonato(null));
            Assert.Throws<FilmesInvalidosException>(() => service.GerarCampeonato(new List<Filme>()));
        }

        [Fact]
        public void GerarCampeonato_QuantidadeInvalida()
        {
            var service = new CampeonatoService();
            var filmes = new List<Filme>() {
                new Filme()
                {
                    Id = "tt4154756",
                    Ano = 2018,
                    Nota = 8.8M,
                    Titulo = "Vingadores: Guerra Infinita"
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
                }
            };

            Assert.Throws<QuantidadeInvalidaException>(() => service.GerarCampeonato(filmes));
        }

        [Fact]
        public void GerarCampeonato_PrimeiroESegundoColocado()
        {
            var service = new CampeonatoService();

            var result = service.GerarCampeonato(filmes);

            // o vencedor está na chave
            result.Keys.First().Titulo.Should().Be("Vingadores: Guerra Infinita");

            // o segundo colocado está no valor
            result.Values.First().Titulo.Should().Be("Os Incríveis 2");
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
