﻿using Microsoft.AspNetCore.Mvc;
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

        /*
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
        */

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
                    Children = ConvertToTreeNode(node.Children)
                };

                results.Add(treeNode);
            }

            return Ok(results);
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
                    Children = ConvertToTreeNode(node.Children)
                };

                result.Add(treeNode);
            }

            return result;
        }


    }
}
