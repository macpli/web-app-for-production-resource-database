using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using WebApi.Entities;
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
        [Route("GetSingleNode/{nodeId}")]
        public async Task<ActionResult<IEnumerable<TreeNodeDTO>>> GetAllFactories(string nodeId)
        {
            var node = await _productionSystemsRepository.GetSingleNode(nodeId);
            return Ok(node);
        }

        [HttpGet]
        [Route("GetAllFactories")]
        public async Task<ActionResult<IEnumerable<TreeNodeDTO>>> GetAllFactories()
        {
            var nodes = await _productionSystemsRepository.GetAllFactories();
            var results = new List<TreeNodeDTO>();
            foreach (var node in nodes)
            {
                results.Add(new TreeNodeDTO
                {
                    NodeId = node.NodeId,
                    KeyId = node.KeyId,
                    ParentId = node.ParentId,
                    Name = node.Name
                });
            }
            return Ok(results);
        }

        [HttpGet("GetChildren/{nodeId}")]
        public async Task<ActionResult<List<TreeNodeDTO>>> GetChildrenForNode(string nodeId)
        {
            var nodes = await _productionSystemsRepository.GetChildrenForNode(nodeId);

            var results = new List<TreeNodeDTO>();
            foreach (var node in nodes)
            {
                var treeNode = new TreeNodeDTO
                {
                    NodeId = node.NodeId,
                    KeyId = node.KeyId,
                    ParentId = node.ParentId,
                    Name = node.Name,
                    Width = node.Width,
                    Height = node.Height,
                    xCoordinate = node.xCoordinate,
                    yCoordinate = node.yCoordinate,
                    Children = ConvertToTreeNode(node.Children),
                    
                };

                results.Add(treeNode);
            }

            return Ok(results);
        }

        [HttpGet("GetNodesToDraft/{nodeId}")]
        public async Task<ActionResult<List<TreeNodeDTO>>> GetNodesToDraft(string nodeId)
        {
            var nodes = await _productionSystemsRepository.GetNodesToDraft(nodeId);

            var results = new List<TreeNodeDTO>();
            foreach (var node in nodes)
            {
                var treeNode = new TreeNodeDTO
                {
                    NodeId = node.NodeId,
                    KeyId = node.KeyId,
                    ParentId = node.ParentId,
                    Name = node.Name,
                    Width = node.Width,
                    Height = node.Height,
                    xCoordinate = node.xCoordinate,
                    yCoordinate = node.yCoordinate,
                    Children = ConvertToTreeNode(node.Children),
                };

                results.Add(treeNode);
            }

            return Ok(results);
        }

        [HttpGet("GetDevices")]
        public async Task<IActionResult> GetDevices()
        {
            var nodes = await _productionSystemsRepository.GetDevices();

            var results = new List<DeviceDTO>();
            foreach (var node in nodes)
            {
                var device = new DeviceDTO
                {
                    ID = node.ID,
                    Name = node.Name,
                    Width= node.Width,
                    Height= node.Height,
                    Type = node.Type,
                };

                results.Add(device);
            }

            return Ok(results);
        }

        [HttpPost("AddDevice")]
        public async Task<ActionResult<DeviceDTO>> AddDevice([FromBody] DeviceDTO newDevice)
        {
            var addedDevice = await _productionSystemsRepository.AddDevice(newDevice);

            if (addedDevice == null)
            {
                return BadRequest("Failed to add the node.");
            }

            var device = new DeviceDTO
            {
                ID = addedDevice.ID,
                Name= addedDevice.Name,
                Width= addedDevice.Width,
                Height= addedDevice.Height,
                Type = addedDevice.Type,
            };

            return Ok(device);
        }

        private List<TreeNodeDTO> ConvertToTreeNode(List<TreeOfMfgPlants> nodes)
        {
            var result = new List<TreeNodeDTO>();
            foreach (var node in nodes)
            {
                var treeNode = new TreeNodeDTO
                {
                    NodeId = node.NodeId,
                    KeyId = node.KeyId,
                    ParentId = node.ParentId,
                    Name = node.Name,
                    Children = ConvertToTreeNode(node.Children),
                    Width = node.Width,
                    Height = node.Height,
                    xCoordinate = node.xCoordinate,
                    yCoordinate = node.yCoordinate
                };

                result.Add(treeNode);
            }

            return result;
        }

        [HttpPost("AddNode")]
        public async Task<ActionResult<TreeNodeDTO>> AddNode([FromBody] TreeNodeDTO newNode)
        {
            var addedNode = await _productionSystemsRepository.AddNode(newNode);

            if (addedNode == null)
            {
                return BadRequest("Failed to add the node.");
            }

            var treeNode = new TreeNodeDTO
            {
                NodeId = addedNode.NodeId,
                KeyId = addedNode.KeyId,
                ParentId = addedNode.ParentId,
                Name = addedNode.Name,
                Width = addedNode.Width,
                Height = addedNode.Height,
            };

            return Ok(treeNode);
        }

        [HttpPatch("UpdateNodeCoordinates")]
        public async Task<ActionResult> UpdateNodeCoordinates([FromBody] NodeCoordinatesUpdateDTO nodeToUpdate)
        {
            var success = await _productionSystemsRepository.UpdateNode(nodeToUpdate);
            if (!success)
            {
                return BadRequest("Failed to update the node.");
            }

            return NoContent(); 
        }


        [HttpDelete("{nodeId}")]
        public async Task<IActionResult> DeleteNodeAndChildren(string nodeId)
        {            
            await _productionSystemsRepository.DeleteNode(nodeId);
            return Ok();
        }

        [HttpGet]
        [Route("GetAtomChildren/{nodeId}")]
        public async Task<ActionResult<IEnumerable<string>>> GetAtomChildren(string nodeId)
        {
            var nodes = await _productionSystemsRepository.GetAtomChildren(nodeId);
            return Ok(nodes);
        }
    }
}
