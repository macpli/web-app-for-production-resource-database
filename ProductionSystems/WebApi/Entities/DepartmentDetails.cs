using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    [Table("MP_Department")]
    public class DepartmentDetails
    {
        [Key]
        [Column("IDDep")]
        [StringLength(15)]
        public string IDDep { get; set; }

        [Column("IDFct")]
        [StringLength(10)]
        public string IDFct { get; set; }

        [Column("Name")]
        [StringLength(80)]
        public string Name { get; set; }

        [Column("Description")]
        [StringLength(120)]
        public string Description { get; set; }

        [Column("NodeId")]
        [StringLength(15)]
        public string NodeId { get; set; }

        [Column("Manager")]
        [StringLength(50)]
        public string Manager { get; set; }
    }
}
