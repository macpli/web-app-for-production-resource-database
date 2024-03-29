﻿using Microsoft.AspNetCore.Mvc;
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
            var details = await _productionSystemsRepository.GetFactoryDetails(nodeId);
            var result = new nodeDetailsDTO()
            {
                IDFct = details.IDFct,
                NodeId = nodeId,
                Name = details.Name,
                Description = details.Description,
                IdOrg = details.IDOrg,
                Location = details.Location
            };

            return Ok(result);
        }

        [HttpGet]
        [Route("GetDepartmentDetails/{nodeId}")]
        public async Task<ActionResult<nodeDetailsDTO>> GetDepartmentDetails(string nodeId)
        {
            var details = await _productionSystemsRepository.GetDepartmentDetails(nodeId);
            var result = new nodeDetailsDTO()
            {
                IDDep = details.IDDep,
                IDFct = details.IDFct,
                NodeId = details.NodeId,
                Name = details.Name,
                Description = details.Description,
                Manager = details.Manager,
            };

            return Ok(result);
        }

        [HttpGet]
        [Route("GetCellDetails/{nodeId}")]
        public async Task<ActionResult<nodeDetailsDTO>> GetCellDetails(string nodeId)
        {
            var details = await _productionSystemsRepository.GetCellDetails(nodeId);
            var result = new nodeDetailsDTO()
            {
                NodeId = details.NodeId,
                Name = details.Name,
                Description = details.Description,
                CELType = details.CELType,
                WarehouseType = details.WarehouseType,
                Supervisor = details.Supervisor,
            };

            return Ok(result);
        }

        [HttpGet]
        [Route("GetWorkstationDetails/{nodeId}")]
        public async Task<ActionResult<nodeDetailsDTO>> GetWorkstationDetails(string nodeId)
        {
            var details = await _productionSystemsRepository.GetWorkstationDetails(nodeId);
            var result = new nodeDetailsDTO()
            {
                Name = details.Name,
                Description = details.Description,
                WSTType = details.WSTType
            };

            return Ok(result);
        }

        [HttpPost]
        [Route("AddFactoryDetails")]
        public async Task<ActionResult<FactoryDetailsDTO>> AddFactoryDetails([FromBody] FactoryDetailsDTO details)
            {
            var addedDetails = await _productionSystemsRepository.AddFactoryDetails(details);

            var factoryDetails = new FactoryDetailsDTO()
            {
                IDFct = addedDetails.IDFct,
                Name = addedDetails.Name,
                Description = addedDetails.Description,
                IDOrg = addedDetails.IDOrg,
                NodeId = addedDetails.NodeId,
                Location = addedDetails.Location,
            };

            return Ok(factoryDetails); 
        }

        [HttpPost]
        [Route("AddDepartmentDetails")]
        public async Task<ActionResult<DepartmentDetailsDTO>> AddDepartmentDetails([FromBody] DepartmentDetailsDTO details)
        {
            var addedDetails = await _productionSystemsRepository.AddDepartmentDetails(details);

            var departmentDetails = new DepartmentDetailsDTO()
            {
                IDDep = addedDetails.IDDep,
                IDFct = addedDetails.IDFct,
                Name = addedDetails.Name,
                Description = addedDetails.Description,
                NodeId = addedDetails.NodeId,
                Manager = addedDetails.Manager,
            };

            return Ok(departmentDetails);
        }

        [HttpPost]
        [Route("AddCellDetails")]
        public async Task<ActionResult<CellDetailsDTO>> AddCellDetails([FromBody] CellDetailsDTO details)
        {
            var addedDetails = await _productionSystemsRepository.AddCellDetails(details);

            var cellDetails = new CellDetailsDTO()
            {
                IDCel = addedDetails.IDCel,
                IDDep = addedDetails.IDDep,
                CELType = addedDetails.CELType,
                WarehouseType = addedDetails.WarehouseType,
                Name = addedDetails.Name,
                Description = addedDetails.Description,
                NodeId = addedDetails.NodeId,
                Supervisor = addedDetails.Supervisor,
            };

            return Ok(cellDetails);
        }

        [HttpPost]
        [Route("AddWorkstationDetails")]
        public async Task<ActionResult<WorkstationDetailsDTO>> AddWorkstationDetails([FromBody] WorkstationDetailsDTO details)
        {
            var addedDetails = await _productionSystemsRepository.AddWorkstationDetails(details);

            var workstationDetails = new WorkstationDetailsDTO()
            {
                IDWst = addedDetails.IDWst,
                IDCel = addedDetails.IDCel,
                WSTType = addedDetails.WSTType,
                Name = addedDetails.Name,
                Description = addedDetails.Description,
                NodeId = addedDetails.NodeId
            };

            return Ok(workstationDetails);
        }

        [HttpDelete("DeleteDetails/{nodeId}")]
        public async Task<IActionResult> DeleteDetails(string nodeId)
        {
            
            await _productionSystemsRepository.DeleteDetails(nodeId);
            return Ok();
            
        }
    }
}
