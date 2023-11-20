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

        public async Task<IEnumerable<TreeOfMfgPlants>> GetStationsForDepartment(string departmentId)
        {
            var department = await _context.TreeOfMfgPlants
                .Where(n => n.KeyId == departmentId)
                .Select(n => n.NodeId)
                .FirstOrDefaultAsync();

            return await _context.TreeOfMfgPlants.Where(n => n.ParentId == department).ToListAsync();
        }
    }
}
