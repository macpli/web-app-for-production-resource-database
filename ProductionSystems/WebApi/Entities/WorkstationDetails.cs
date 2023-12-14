using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    [Table("MP_Workstation")]
    public class WorkstationDetails
    {
        [Key]
        [Column("IDWst")]
        [StringLength(10)]
        public string IDWst { get; set; }

        [Column("IDCel")]
        [StringLength(15)]
        public string IDCel { get; set; }

        [Column("WSTType")]
        [StringLength(15)]
        public string WSTType { get; set; }

        [Column("Name")]
        [StringLength(80)]
        public string Name { get; set; }

        [Column("Description")]
        [StringLength(120)]
        public string Description { get; set; }

        [Column("NodeId")]
        [StringLength(50)]
        public string NodeId { get; set; }
    }
}
