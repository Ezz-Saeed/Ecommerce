
namespace API.Errors
{
    public class ApiResponseError
    {
        public ApiResponseError(int status, string? message=null)
        {
            StatusCode = status;
            Message = message ?? GetDefaultMessageForStatusCode(StatusCode);
        }

        public int StatusCode { get; set; }
        public string? Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad request",
                401 => "Unauthorized user",
                404 => "Resource not fount",
                500 => "Server error",
                _ => "Something went wrong"
            };
    }
    }
}
