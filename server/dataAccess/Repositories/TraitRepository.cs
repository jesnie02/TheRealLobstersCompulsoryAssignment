using dataAccess.interfaces;
using dataAccess.Models;

namespace dataAccess.Repositories;

public class TraitRepository : ITrait
{
    private readonly MyDbContext _context;

    public TraitRepository(MyDbContext context)
    {
        _context = context;
    }

    public Trait InsertTrait(Trait trait)
    {
        _context.Traits.Add(trait);
        _context.SaveChanges();
        return trait;
    }

    public Trait UpdateTrait(Trait trait)
    {
        _context.Traits.Update(trait);
        _context.SaveChanges();
        return trait;
    }

    public bool DeleteTrait(int id)
    {
        var trait = _context.Traits.Find(id);
        if (trait == null)
        {
            return false;
        }

        _context.Traits.Remove(trait);
        _context.SaveChanges();
        return true;
    }
}