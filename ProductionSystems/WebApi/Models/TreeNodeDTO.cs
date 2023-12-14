namespace WebApi.Models
{
    public class TreeNodeDTO
    {
        public string NodeId { get; set; }
        public string KeyId { get; set; }
        public string ParentId { get; set; }
        public string Name { get; set; }
        public int? Width { get; set; }
        public int? Height { get; set; }
        public List<TreeNodeDTO>? Children { get; set;} 
    }
}
