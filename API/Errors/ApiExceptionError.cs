namespace API.Errors
{
    public class ApiExceptionError : ApiResponseError
    {
        public ApiExceptionError(int status, string? message = null, string? details = null) : base(status, message)
        {
            Details = details;
        }

        public string? Details { get; set; }
    }
}
