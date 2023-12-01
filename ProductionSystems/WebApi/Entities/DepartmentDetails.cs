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
        public string IDCel { get; set; }

        [Column("DEPName")]
        [StringLength(80)]
        public string DEPName { get; set; }

        [Column("Description")]
        [StringLength(120)]
        public string Description { get; set; }

        [Column("NodeId")]
        [StringLength(15)]
        public string NodeId { get; set; }
    }
}
