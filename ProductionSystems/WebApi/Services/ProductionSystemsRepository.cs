using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
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

        //
        // Methods for TreeOfMfgPlants
        //
        public async Task<IEnumerable<TreeOfMfgPlants>> GetAllFactories()
        {
            return await _context.TreeOfMfgPlants.Where(n => n.KeyId.StartsWith("F")).ToListAsync();
        }

        public async Task<List<TreeOfMfgPlants>> GetChildrenForNode(string nodeId)
        {
            var children = await _context.TreeOfMfgPlants.Where(n => n.ParentId == nodeId).ToListAsync();

            foreach (var child in children)
            {
                if (child.KeyId.StartsWith("E"))
                {
                    // Break the loop if the current child's KeyId starts with 'E'
                    break;
                }

                child.Children = await GetChildrenForNode(child.NodeId);
            }

            return children;
        }

        public async Task<List<TreeOfMfgPlants>> GetWorkPieces()
        {
            var children = await _context.TreeOfMfgPlants.Where(n => n.KeyId.StartsWith("Z")).ToListAsync();

            List<TreeOfMfgPlants> result = new List<TreeOfMfgPlants>();

            foreach (var startingNode in children)
            {
                startingNode.Children = await GetChildrenForNode(startingNode.NodeId);
                result.Add(startingNode);
            }

            return result;
        }

        //
        // Methods for Factory Details
        //
        public async Task<FactoryDetails> GetFactoryDetails(string nodeId)
        {
            return await _context.FactoryDetails.Where(n => n.IDFct == nodeId).SingleOrDefaultAsync();
        }

        public async Task<DepartmentDetails> GetDepartmentDetails(string nodeId)
        {
            return await _context.DepartmentDetails.Where(d => d.NodeId == nodeId).SingleOrDefaultAsync();
        }

        //
        // Method for adding nodes
        //
        public async Task<TreeOfMfgPlants> AddNode(TreeNodeDTO node)
        {
            var nodeEntity = new TreeOfMfgPlants
            {
                NodeId = node.NodeId,
                KeyId = node.KeyId,
                ParentId = node.ParentId,
                Name = node.Name,
            };

            _context.TreeOfMfgPlants.Add(nodeEntity);
            await _context.SaveChangesAsync();

            return nodeEntity;
        }

        //
        // Method for getting atom children
        //
        public async Task<IEnumerable<string>> GetAtomChildren(string nodeId)
        {
            var atomChildren = await _context.TreeOfMfgPlants.Where(n => n.ParentId == nodeId)
                .Select(n => n.KeyId)
                .ToListAsync();

            return atomChildren;
        }

    }
}
