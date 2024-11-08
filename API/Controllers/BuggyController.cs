using API.Errors;
using Infrustructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext context;

        public BuggyController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFound()
        {
            var data = context.Products.Find(42);
            if(data is null)
            {
                return NotFound(new ApiResponseError(404));
            }
            return Ok(data);
        }


        [HttpGet("testAuth")]
        [Authorize]
        public ActionResult<string> Test()
        {
            return "tests";
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var data = context.Products.Find(42);
            var dataToReturn = data.ToString();
            return Ok(data);
        }


        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponseError(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetBadRequest(int id)
        {
           
            return BadRequest();
        }
    }
}
