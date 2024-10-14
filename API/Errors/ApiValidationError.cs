namespace API.Errors
{
    public class ApiValidationError : ApiResponseError
    {
        public ApiValidationError() : base(400)
        {
        }

        public IEnumerable<string> Errors { get; set; }
    }
}
