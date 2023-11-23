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

        public async Task<IEnumerable<TreeOfMfgPlants>> GetAllFactories()
        {
            return await _context.TreeOfMfgPlants.Where(n => n.KeyId.StartsWith("F")).ToListAsync();
        }

        public async Task<List<TreeOfMfgPlants>> GetChildrenForNode(string nodeId)
        {
            var children = await _context.TreeOfMfgPlants.Where(n => n.ParentId == nodeId).ToListAsync();

            foreach (var child in children)
            {
                child.Children = await GetChildrenForNode(child.NodeId);
            }

            return children;
        }
    }
}
