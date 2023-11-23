using WebApi.Models;

namespace WebApi.Services
{
    public interface IProductionSystemsRepository
    {
        Task<IEnumerable<TreeOfMfgPlants>> GetAllFactories();
        Task<List<TreeOfMfgPlants>> GetChildrenForNode(string nodeId);
    }
}
