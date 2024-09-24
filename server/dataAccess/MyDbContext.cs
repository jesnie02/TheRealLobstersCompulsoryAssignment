using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using dataAccess.Models;

namespace dataAccess;

public partial class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderEntry> OrderEntries { get; set; }

    public virtual DbSet<Paper> Papers { get; set; }

    public virtual DbSet<Trait> Traits { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("customers_pkey");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("orders_pkey");

            entity.Property(e => e.OrderDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.Status).HasDefaultValueSql("'pending'::character varying");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("orders_customer_id_fkey");
        });

        modelBuilder.Entity<OrderEntry>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("order_entries_pkey");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderEntries).HasConstraintName("order_entries_order_id_fkey");

            entity.HasOne(d => d.Product).WithMany(p => p.OrderEntries).HasConstraintName("order_entries_product_id_fkey");
        });

        modelBuilder.Entity<Paper>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("paper_pkey");

            entity.Property(e => e.Discontinued).HasDefaultValue(false);
            entity.Property(e => e.Stock).HasDefaultValue(0);

            entity.HasMany(d => d.Traits).WithMany(p => p.Papers)
                .UsingEntity<Dictionary<string, object>>(
                    "PaperTrait",
                    r => r.HasOne<Trait>().WithMany()
                        .HasForeignKey("TraitId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("paper_traits_trait_id_fkey"),
                    l => l.HasOne<Paper>().WithMany()
                        .HasForeignKey("PaperId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("paper_traits_paper_id_fkey"),
                    j =>
                    {
                        j.HasKey("PaperId", "TraitId").HasName("paper_traits_pkey");
                        j.ToTable("paper_traits");
                        j.HasIndex(new[] { "TraitId" }, "IX_paper_traits_trait_id");
                        j.IndexerProperty<int>("PaperId").HasColumnName("paper_id");
                        j.IndexerProperty<int>("TraitId").HasColumnName("trait_id");
                    });
        });

        modelBuilder.Entity<Trait>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("traits_pkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
