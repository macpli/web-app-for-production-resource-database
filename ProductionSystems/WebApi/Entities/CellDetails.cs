using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    [Table("MP_Cell")]
    public class CellDetails
    {
        [Key]
        [Column("IDCel")]
        [StringLength(10)]
        public string IDCel { get; set; }

        [Column("IDDep")]
        [StringLength(15)]
        public string IDDep { get; set; }

        [Column("CELType")]
        [StringLength(15)]
        public string CELType { get; set; }

        [Column("Name")]
        [StringLength(80)]
        public string Name { get; set; }

        [Column("Description")]
        [StringLength(120)]
        public string Description { get; set; }

        [Column("NodeId")]
        [StringLength(15)]
        public string NodeId { get; set; }

        [Column("Supervisor")]
        [StringLength(50)]
        public string Supervisor { get; set; }
    }
}
