using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Teleimot.Data.Models;

namespace Teleimot.Web.Api.Controllers
{
    public class RealEstateTypesController : ApiController
    {
        public IHttpActionResult GetAll()
        {
            var realEstateTypes = Enum.GetNames(typeof(RealEstateType))
                .Select(name => new
                {
                    Id = (int)Enum.Parse(typeof(RealEstateType), name),
                    Name = name
                })
                .ToArray();

            return Ok(realEstateTypes);
        }
    }
}