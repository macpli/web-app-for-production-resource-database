using WebApi.Models;

namespace WebApi.Services
{
    public interface IProductionSystemsRepository
    {
        Task<IEnumerable<TreeOfMfgPlants>> GetAllNodesAsync();
        Task<IEnumerable<TreeOfMfgPlants>> GetAllFactories();
        Task<IEnumerable<TreeOfMfgPlants>> GetDepartmentsForFactory(string factoryId);
        Task<IEnumerable<TreeOfMfgPlants>> GetStationsForDepartment(string departmentId);
    }
}
