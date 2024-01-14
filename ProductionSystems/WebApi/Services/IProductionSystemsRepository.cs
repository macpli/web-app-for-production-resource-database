using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Services
{
    public interface IProductionSystemsRepository
    {
        // TreeOfMfgPlants
        Task<TreeOfMfgPlants>               GetSingleNode(string nodeId);
        Task<IEnumerable<TreeOfMfgPlants>>  GetAllFactories();
        Task<List<TreeOfMfgPlants>>         GetWorkPieces();
        Task<IEnumerable<string>>           GetAtomChildren(string nodeId);
        Task<List<TreeOfMfgPlants>>         GetChildrenForNode(string nodeId);
        Task<List<TreeOfMfgPlants>>         GetNodesToDraft(string nodeId);

        Task<TreeOfMfgPlants> AddNode(TreeNodeDTO node);
        Task<bool>            UpdateNode(NodeCoordinatesUpdateDTO node);
        Task                  DeleteNode(string nodeId);

        // Details
        // Getting Details
        Task<FactoryDetails>     GetFactoryDetails(string nodeId);
        Task<DepartmentDetails>  GetDepartmentDetails(string nodeId);
        Task<CellDetails>        GetCellDetails(string nodeId);
        Task<WorkstationDetails> GetWorkstationDetails(string nodeId);

        // Adding Details
        Task<FactoryDetails>        AddFactoryDetails(FactoryDetailsDTO details);
        Task<DepartmentDetails>     AddDepartmentDetails(DepartmentDetailsDTO details);
        Task<CellDetails>           AddCellDetails(CellDetailsDTO details);
        Task<WorkstationDetails>    AddWorkstationDetails(WorkstationDetailsDTO details);

        // Deleting Details
        Task DeleteDetails(string nodeId);
    }
}
