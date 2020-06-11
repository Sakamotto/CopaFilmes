using CopaFilmes.Entities;
using System.Collections.Generic;

namespace CopaFilmes.Interfaces
{
    public interface ICampeonatoService
    {
        Dictionary<Filme, Filme> GerarCampeonato(IEnumerable<Filme> filmes);

    }
}
