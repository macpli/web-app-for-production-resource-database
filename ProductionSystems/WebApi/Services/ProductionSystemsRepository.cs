using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
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
                Width = node.Width,
                Height = node.Height,
            };

            _context.TreeOfMfgPlants.Add(nodeEntity);
            await _context.SaveChangesAsync();

            return nodeEntity;
        }

        //
        // Method for deleting a node and it's children recursively
        //
        public async Task DeleteNode(string nodeId)
        {
            var nodeToDelete = _context.TreeOfMfgPlants.FindAsync(nodeId);

            if(nodeToDelete != null)
            {
                _context.TreeOfMfgPlants.Remove(await nodeToDelete);
                await _context.SaveChangesAsync();

                var childrenToDelete = await _context.TreeOfMfgPlants.Where(n => n.ParentId == nodeId).ToListAsync();

                foreach (var child in childrenToDelete)
                {
                    // Recursively delete children of the current child
                    await DeleteNode(child.NodeId);
                }
            }
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

        //
        // Method for getting closest children 
        //
        public async Task<IEnumerable<TreeOfMfgPlants>> GetAllFactories()
        {
            return await _context.TreeOfMfgPlants.Where(n => n.KeyId.StartsWith("F")).ToListAsync();
        }

        //
        // Method for recursively getting children 
        //
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
                // Fetch width and height values from the database for the child
                var childFromDatabase = await _context.TreeOfMfgPlants
                    .Where(n => n.NodeId == child.NodeId)
                    .FirstOrDefaultAsync();

                child.Children = await GetChildrenForNode(child.NodeId);
            }

            return children;
        }

        //
        // Method for getting a node and its children for draft
        //
        public async Task<List<TreeOfMfgPlants>> GetNodesToDraft(string nodeId)
        {
            // Fetch the node itself
            var node = await _context.TreeOfMfgPlants.FirstOrDefaultAsync(n => n.NodeId == nodeId);

            if (node != null)
            {
                // Fetch children if the node exists
                node.Children = await GetChildrenForNode(nodeId);
            }

            // Return the node and its children
            return node != null ? new List<TreeOfMfgPlants> { node } : null;
        }

        //
        // Method for getting workpieces
        //
        public async Task<List<TreeOfMfgPlants>> GetWorkPieces()
        {
            var children = await _context.TreeOfMfgPlants.Where(n => n.KeyId.StartsWith("E")).ToListAsync();

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
        // Getting Details
        //
        public async Task<FactoryDetails> GetFactoryDetails(string nodeId)
        {
            return await _context.FactoryDetails.Where(n => n.NodeId == nodeId).SingleOrDefaultAsync();
        }

        public async Task<DepartmentDetails> GetDepartmentDetails(string nodeId)
        {
            return await _context.DepartmentDetails.Where(d => d.NodeId == nodeId).SingleOrDefaultAsync();
        }

        public async Task<CellDetails> GetCellDetails(string nodeId)
        {
            return await _context.CellDetails.Where(c => c.NodeId == nodeId).SingleOrDefaultAsync();
        }

        public async Task<WorkstationDetails> GetWorkstationDetails(string nodeId)
        {
            return await _context.WorkstationDetails.Where(w => w.NodeId == nodeId).SingleOrDefaultAsync();
        }

        //
        // Adding Details
        //
        public async Task<FactoryDetails> AddFactoryDetails(FactoryDetailsDTO details)
        {
            var detailsEntity = new FactoryDetails
            {
                IDFct = details.IDFct,
                Name = details.Name,
                Description = details.Description,
                IDOrg = details.IDOrg,
                NodeId = details.NodeId,
                Location = details.Location,
            };

            _context.FactoryDetails.Add(detailsEntity);
            await _context.SaveChangesAsync();

            return detailsEntity;
        }

        public async Task<DepartmentDetails> AddDepartmentDetails(DepartmentDetailsDTO details)
        {
            var detailsEntity = new DepartmentDetails
            {
                IDDep = details.IDDep,
                IDFct = details.IDFct,
                Name = details.Name,
                Description = details.Description,
                NodeId = details.NodeId,
                Manager = details.Manager,
            };

            _context.DepartmentDetails.Add(detailsEntity);
            await _context.SaveChangesAsync();

            return detailsEntity;
        }

        public async Task<CellDetails> AddCellDetails(CellDetailsDTO details)
        {
            // WarehouseType"
            // 0 - not a warehouse
            // 1 - input warehouse
            // 2 - output warehouse

            var detailsEntity = new CellDetails
            {
                IDCel = details.IDCel,
                IDDep = details.IDDep,
                CELType = details.CELType,
                WarehouseType = details.WarehouseType,
                Name = details.Name,
                Description = details.Description,
                NodeId = details.NodeId,
                Supervisor = details.Supervisor,
            };

            _context.CellDetails.Add(detailsEntity);
            await _context.SaveChangesAsync();

            return detailsEntity;
        }

        public async Task<WorkstationDetails> AddWorkstationDetails(WorkstationDetailsDTO details)
        {
            var detailsEntity = new WorkstationDetails
            {
                IDWst = details.IDWst,
                IDCel = details.IDCel,
                WSTType = details.WSTType,
                Name = details.Name,
                Description = details.Description,
                NodeId = details.NodeId,
            };

            _context.WorkstationDetails.Add(detailsEntity);
            await _context.SaveChangesAsync();

            return detailsEntity;
        }

        //
        // Deleting Details
        //
        public async Task DeleteDetails(string nodeId)
        {
            try
            {
                await DeleteRecordsByNodeId<DepartmentDetails>(nodeId);
                await DeleteRecordsByNodeId<CellDetails>(nodeId);
                await DeleteRecordsByNodeId<WorkstationDetails>(nodeId);
                await DeleteRecordsByNodeId<FactoryDetails>(nodeId);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                throw new ApplicationException("An error occurred while deleting the node and its children.", ex);
            }
        }

        private async Task DeleteRecordsByNodeId<T>(string nodeId) where T : class
        {
            IEntityType entityType = _context.Model.FindEntityType(typeof(T));
            string tableName = entityType.GetTableName();

            await _context.Database.ExecuteSqlRawAsync($"DELETE FROM {tableName} WHERE NodeId LIKE '{nodeId}%'");
        }
    }
}
