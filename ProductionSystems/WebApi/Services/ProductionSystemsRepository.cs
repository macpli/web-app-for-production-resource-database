using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Services
{
    public class ProductionSystemsRepository : IProductionSystemsRepository
    {
        private readonly ProductionSystemContext _context;

        public ProductionSystemsRepository(ProductionSystemContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<TreeOfMfgPlants>> GetAllNodesAsync()
        {
            return await _context.TreeOfMfgPlants.ToListAsync();
        }

        public async Task<IEnumerable<TreeOfMfgPlants>> GetAllFactories()
        {
            return await _context.TreeOfMfgPlants.Where(n => n.KeyId.StartsWith("F")).ToListAsync();
        }

        public async Task<IEnumerable<TreeOfMfgPlants>> GetDepartmentsForFactory(string factoryId)
        {
            return await _context.TreeOfMfgPlants.Where(n => n.ParentId == factoryId).ToListAsync();
        }

        public async Task<IEnumerable<TreeOfMfgPlants>> GetCellsForDepartment(string departmentId)
        {
            

            return await _context.TreeOfMfgPlants.Where(n => n.ParentId == departmentId).ToListAsync();
        }

        public async Task<IEnumerable<TreeOfMfgPlants>> GetDeviceGroupsForCell(string cellId)
        {
            return await _context.TreeOfMfgPlants.Where(n => n.ParentId == cellId).ToListAsync();
        }

        public async Task<IEnumerable<TreeOfMfgPlants>> GetEquipment(string deviceGroupId)
        {
            return await _context.TreeOfMfgPlants.Where(n => n.ParentId == deviceGroupId).ToListAsync();
        }
    }
}
