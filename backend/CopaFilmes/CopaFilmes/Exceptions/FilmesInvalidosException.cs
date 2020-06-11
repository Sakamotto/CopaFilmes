using System;

namespace CopaFilmes.Exceptions
{
    public class FilmesInvalidosException : Exception
    {

        public FilmesInvalidosException()
        {
        }

        public FilmesInvalidosException(string message)
            : base(message)
        {
        }

    }
}
