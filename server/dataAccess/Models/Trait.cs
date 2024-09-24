using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace dataAccess.Models;

[Table("traits")]
public partial class Trait
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("trait_name")]
    [StringLength(255)]
    public string? TraitName { get; set; } = null!;

    [ForeignKey("TraitId")]
    [InverseProperty("Traits")]
    public virtual ICollection<Paper> Papers { get; set; } = new List<Paper>();
}
