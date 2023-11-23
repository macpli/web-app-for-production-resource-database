using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TreeOfMfgPlantsController : Controller
    {
        private readonly ProductionSystemContext _productionSystemContext;
        private readonly IProductionSystemsRepository _productionSystemsRepository;
        public TreeOfMfgPlantsController(ProductionSystemContext productionSystemContext, IProductionSystemsRepository productionSystemsRepository)
        {
            _productionSystemContext = productionSystemContext;
            _productionSystemsRepository = productionSystemsRepository ?? throw new ArgumentNullException(nameof(productionSystemsRepository));
        }

        [HttpGet]
        [Route("GetAllNodes")]
        public async Task<ActionResult<IEnumerable<TreeNode>>> GetAllNodes()
        {
            var nodes = await _productionSystemsRepository.GetAllNodesAsync();
            var results = new List<TreeNode>();
            foreach (var node in nodes)
            {
                results.Add(new TreeNode
                { 
                    NodeId = node.NodeId, 
                    KeyId = node.KeyId,
                    ParentId = node.ParentId,
                    Name = node.Name
                });
            }
            return Ok(results);
        }

        [HttpGet]
        [Route("GetAllFactories")]
        public async Task<ActionResult<IEnumerable<TreeNode>>> GetAllFactories()
        {
            var nodes = await _productionSystemsRepository.GetAllFactories();
            var results = new List<TreeNode>();
            foreach (var node in nodes)
            {
                results.Add(new TreeNode
                {
                    NodeId = node.NodeId,
                    KeyId = node.KeyId,
                    ParentId = node.ParentId,
                    Name = node.Name
                });
            }
            return Ok(results);
        }

        [HttpGet]
        [Route("GetDepartmentsForFactory/{factoryId}")]
        public async Task<ActionResult<IEnumerable<TreeNode>>> GetAllChildrenNodes(string factoryId)
        {
            var nodes = await _productionSystemsRepository.GetDepartmentsForFactory(factoryId);
            var results = new List<TreeNode>();
            foreach (var node in nodes)
            {
                results.Add(new TreeNode
                {
                    NodeId = node.NodeId,
                    KeyId = node.KeyId,
                    ParentId = node.ParentId,
                    Name = node.Name
                });
            }
            return Ok(results);
        }

        [HttpGet]
        [Route("GetCellsForDepartment/{departmentId}")]
        public async Task<ActionResult<IEnumerable<TreeNode>>> GetCellsForDepartment(string departmentId)
        {
            var nodes = await _productionSystemsRepository.GetCellsForDepartment(departmentId);
            var results = new List<TreeNode>();
            foreach (var node in nodes)
            {
                results.Add(new TreeNode
                {
                    NodeId = node.NodeId,
                    KeyId = node.KeyId,
                    ParentId = node.ParentId,
                    Name = node.Name
                });
            }
            return Ok(results);
        }

        [HttpGet]
        [Route("GetDeviceGroupsForCell/{cellId}")]
        public async Task<ActionResult<IEnumerable<TreeNode>>> GetDeviceGroupsForCell(string cellId)
        {
            var nodes = await _productionSystemsRepository.GetDeviceGroupsForCell(cellId);
            var results = new List<TreeNode>();
            foreach (var node in nodes)
            {
                results.Add(new TreeNode
                {
                    NodeId = node.NodeId,
                    KeyId = node.KeyId,
                    ParentId = node.ParentId,
                    Name = node.Name
                });
            }
            return Ok(results);
        }

        [HttpGet]
        [Route("GetEquipment/{deviceGroup}")]
        public async Task<ActionResult<IEnumerable<TreeNode>>> GetEquipment(string deviceGroupId)
        {
            var nodes = await _productionSystemsRepository.GetEquipment(deviceGroupId);
            var results = new List<TreeNode>();
            foreach (var node in nodes)
            {
                results.Add(new TreeNode
                {
                    NodeId = node.NodeId,
                    KeyId = node.KeyId,
                    ParentId = node.ParentId,
                    Name = node.Name
                });
            }
            return Ok(results);
        }
    }
}
