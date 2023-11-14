using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Entities
{
    public class ParentNode
    {
        [Column("ParentID")]
        [StringLength(50)]
        [Unicode(false)]
        public string ParentId { get; set; }
    }
}
