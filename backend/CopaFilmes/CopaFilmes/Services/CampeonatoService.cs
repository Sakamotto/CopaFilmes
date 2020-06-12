using CopaFilmes.Entities;
using CopaFilmes.Exceptions;
using CopaFilmes.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace CopaFilmes.Services
{
    public class CampeonatoService : ICampeonatoService
    {
        private Dictionary<Filme, Filme> MontarChaveamentoInicial(IEnumerable<Filme> filmes)
        {
            filmes = filmes.OrderBy(f => f.Titulo);
            Dictionary<Filme, Filme> chaves = new Dictionary<Filme, Filme>();

            for (int i = 0; i < (filmes.Count() / 2); i++)
            {
                chaves.Add(filmes.ElementAt(i), filmes.ElementAt(filmes.Count() - 1 - i));
            }

            return chaves;
        }

        public Dictionary<Filme, Filme> GerarCampeonato(IEnumerable<Filme> filmes)
        {

            if (filmes == null || filmes.Count() == 0)
            {
                throw new FilmesInvalidosException("A lista de filmes não está no formato correto.");
            }

            if (filmes.Count() != 8)
            {
                throw new QuantidadeInvalidaException("É necessário selecionar exatamente 8 filmes para começar o campeonato.");
            }

            var chaveamentoInicial = MontarChaveamentoInicial(filmes);
            return ObterVencedor(chaveamentoInicial);
        }

        public Dictionary<Filme, Filme> ObterVencedor(Dictionary<Filme, Filme> chaves)
        {
            var vencedores = RealizarDisputa(chaves);

            // Se for a final, retorna o resultado da disputa entre os dois finalistas
            if (vencedores.Count == 1) return RealizarPartida(vencedores.Single().Key, vencedores.Single().Value);

            // caso contrário continua computando os vencedores
            return ObterVencedor(vencedores);

        }

        public Dictionary<Filme, Filme> RealizarDisputa(Dictionary<Filme, Filme> chaves)
        {
            List<Filme> vencedores = new List<Filme>();
            Dictionary<Filme, Filme> chaveVencedores = new Dictionary<Filme, Filme>();

            foreach (var filme in chaves)
            {
                var resultado = RealizarPartida(filme.Key, filme.Value);
                vencedores.Add(resultado.Single().Key);
            }

            int skip = 0;

            for (int i = 0; i < (vencedores.Count / 2); i++)
            {
                var chave = vencedores.Skip(skip).Take(1).Single();
                var valor = vencedores.Skip(skip + 1).Take(1).Single();

                chaveVencedores.Add(chave, valor);

                skip += 2;
            }

            return chaveVencedores;
        }

        public Dictionary<Filme, Filme> RealizarPartida(Filme chaveEsquerda, Filme chaveDireita)
        {
            var resultado = new Dictionary<Filme, Filme>();

            var tempList = new List<Filme>()
            {
                chaveEsquerda,
                chaveDireita
            };

            tempList = tempList.OrderByDescending(f => f.Nota).ThenBy(f => f.Titulo).ToList();
            resultado.Add(tempList[0], tempList[1]);

            return resultado;
        }
    }
}
