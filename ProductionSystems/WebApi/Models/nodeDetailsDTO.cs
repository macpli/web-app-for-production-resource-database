namespace WebApi.Models
{
    public class nodeDetailsDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string? CELType { get; set; }
        public string? WSTType { get; set; }
        public string? IdOrg { get; set; }
        public string? Location { get; set; }
        public string? Manager { get; set; }
        public string? Supervisor { get; set; }
    }
}