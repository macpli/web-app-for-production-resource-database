using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FactoryDetailsController : Controller
    {
        private readonly IProductionSystemsRepository _productionSystemsRepository;
        public FactoryDetailsController(IProductionSystemsRepository productionSystemsRepository)
        {
            _productionSystemsRepository = productionSystemsRepository ?? throw new ArgumentNullException(nameof(productionSystemsRepository));
        }

        [HttpGet]
        [Route("GetFactoryDetails/{nodeId}")]
        public async Task<ActionResult<nodeDetailsDTO>> GetFactoryDetails(string nodeId)
        {
            var node = await _productionSystemsRepository.GetFactoryDetails(nodeId);
            var result = new nodeDetailsDTO()
            {
                nodeName = node.FCTName,
                nodeDesc = node.Description,
                idOrg = node.IDOrg,
            };

            return Ok(result);
        }

        [HttpGet]
        [Route("GetDepartmentDetails/{nodeId}")]
        public async Task<ActionResult<nodeDetailsDTO>> GetDepartmentDetails(string nodeId)
        {
            var node = await _productionSystemsRepository.GetDepartmentDetails(nodeId);
            var result = new nodeDetailsDTO()
            {
                nodeName = node.DEPName,
                nodeDesc = node.Description,
            };

            return Ok(result);
        }
    }
}
