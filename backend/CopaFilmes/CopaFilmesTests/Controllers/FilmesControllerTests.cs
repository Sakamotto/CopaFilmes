using CopaFilmes.Controllers;
using CopaFilmes.Entities;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace CopaFilmesTests
{
    public class FilmesControllerTests
    {
        [Fact]
        public async Task Get_VerificarSeOsFilmesForamCarregados()
        {
            // Arrange
            var controller = new FilmesController();

            // Act
            var getResult = await controller.Get();
            var result = getResult as OkObjectResult;
            var filmes = result.Value as IEnumerable<Filme>;

            // Assert
            Assert.IsAssignableFrom<IActionResult>(getResult);

            filmes.Any(f => string.IsNullOrEmpty(f.Titulo)).Should().BeFalse();
            filmes.Count().Should().Be(16);
        }
    }
}
