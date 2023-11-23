namespace WebApi.Models
{
    public class TreeNode
    {
        public string NodeId { get; set; }
        public string KeyId { get; set; }
        public string ParentId { get; set; }
        public string Name { get; set; }
        public List<TreeNode> Children { get; set;} = new List<TreeNode>();
    }
}
