using WebApi.Models;

namespace WebApi.Services
{
    public interface IProductionSystemsRepository
    {
        Task<IEnumerable<TreeOfMfgPlants>> GetAllNodesAsync();
        Task<IEnumerable<TreeOfMfgPlants>> GetAllFactories();
        Task<IEnumerable<TreeOfMfgPlants>> GetDepartmentsForFactory(string factoryId);
        Task<IEnumerable<TreeOfMfgPlants>> GetCellsForDepartment(string departmentId);
        Task<IEnumerable<TreeOfMfgPlants>> GetDeviceGroupsForCell(string cellId);
        Task<IEnumerable<TreeOfMfgPlants>> GetEquipment(string deviceGroupId);
    }
}
