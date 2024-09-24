using dataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using dataAccess;

namespace service.Services
{
    public class TraitService
    {
        private readonly MyDbContext _context;

        public TraitService(MyDbContext context)
        {
            _context = context;
        }

        // Creates a new trait
        public async Task<Trait> CreateTraitAsync(Trait trait)
        {
            _context.Traits.Add(trait);
            await _context.SaveChangesAsync();
            return trait;
        }

        // Retrieves a trait by its ID
        public async Task<Trait?> GetTraitByIdAsync(int id)
        {
            return await _context.Traits.FindAsync(id);
        }

        // Retrieves all traits
        public async Task<IEnumerable<Trait>> GetAllTraitsAsync()
        {
            return await _context.Traits.ToListAsync();
        }
    }
}