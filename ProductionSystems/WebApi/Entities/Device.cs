using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Entities
{
    [Table("Devices")]
    public class Device
    {
        [Key]
        [Column("ID")]
        [StringLength(10)]
        public string ID { get; set; }

        [Column("Name")]
        [StringLength(50)]
        public string Name { get; set; }

        [Column("Width")]
        public int Width { get; set; }

        [Column("Height")]
        public int Height { get; set; }

        [Column("Type")]
        [StringLength(20)]
        public string Type { get; set; }
    }
}
