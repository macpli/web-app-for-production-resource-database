﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Models
{
    public class TreeOfMfgPlants
    {
        [Key]
        [Column("NodeID")]
        [StringLength(50)]
        [Unicode(false)]
        public string NodeId { get; set; }

        [Column("KeyID")]
        [StringLength(5)]
        [Unicode(false)]
        public string KeyId { get; set; }

        [Column("ParentID")]
        [StringLength(50)]
        [Unicode(false)]
        public string ParentId { get; set; }

        [StringLength(150)]
        public string Name { get; set; }

        [NotMapped]
        public List<TreeOfMfgPlants> Children { get; set; } = new List<TreeOfMfgPlants>();
    }
}