using System;

namespace CopaFilmes.Exceptions
{
    public class QuantidadeInvalidaException : Exception
    {

        public QuantidadeInvalidaException()
        {
        }

        public QuantidadeInvalidaException(string message)
            : base(message)
        {
        }

    }
}
