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

        [Column("FCTName")]
        [StringLength(80)]
        public string FCTName { get; set; }

        [Column("Description")]
        [StringLength(120)]
        public string Description { get; set; }

        [Column("IDOrg")]
        [StringLength(10)]
        public string IDOrg { get; set; }
    }
}
