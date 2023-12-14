using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    [Table("MP_Factory")]
    public class FactoryDetails
    {
        [Key]
        [Column("IDFct")]
        [StringLength(10)]
        public string IDFct { get; set; }

        [Column("Name")]
        [StringLength(80)]
        public string Name { get; set; }

        [Column("Description")]
        [StringLength(120)]
        public string Description { get; set; }

        [Column("IDOrg")]
        [StringLength(10)]
        public string IDOrg { get; set; }

        [Column("NodeId")]
        [StringLength(50)]
        public string NodeId { get; set; }
    }
}
