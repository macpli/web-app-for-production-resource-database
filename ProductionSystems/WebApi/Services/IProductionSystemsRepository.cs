using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Services
{
    public interface IProductionSystemsRepository
    {
        Task<IEnumerable<TreeOfMfgPlants>> GetAllFactories();
        Task<List<TreeOfMfgPlants>> GetWorkPieces();
        Task<IEnumerable<string>> GetAtomChildren(string nodeId);
        Task<List<TreeOfMfgPlants>> GetChildrenForNode(string nodeId);

        Task<FactoryDetails> GetFactoryDetails(string nodeId);
        Task<DepartmentDetails> GetDepartmentDetails(string nodeId);

        Task<TreeOfMfgPlants> AddNode(TreeNodeDTO nodeDTO);
    }
}
