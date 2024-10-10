﻿using dataAccess;
using dataAccess.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using service.dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace service.Services
{
    public interface ITraitService
    {
        Task<TraitDto> CreateTraitAsync(TraitDto traitDto);
        Task<TraitDto?> GetTraitByIdAsync(int id);
        Task<IEnumerable<TraitDto>> GetAllTraitsAsync();
        Task<TraitDto?> UpdateTraitAsync(TraitDto traitDto);
        Task<bool> DeleteTraitAsync(int id);
        Task<IEnumerable<TraitDto>> GetTraitsByPaperIdAsync(int paperId);
    }
    
    public class TraitService : ITraitService
    {
        private readonly MyDbContext _context;
        private readonly ILogger<TraitService> _logger;
        private readonly IValidator<TraitDto> _traitValidator;

        public TraitService(MyDbContext context, ILogger<TraitService> logger, IValidator<TraitDto> traitValidator)
        {
            _context = context;
            _logger = logger;
            _traitValidator = traitValidator;
        }

        public async Task<TraitDto> CreateTraitAsync(TraitDto traitDto)
        {
            _logger.LogInformation("Creating a new trait");
            await _traitValidator.ValidateAndThrowAsync(traitDto);
            var trait = new Trait
            {
                TraitName = traitDto.TraitName
            };
            _context.Traits.Add(trait);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Trait created successfully");
            return new TraitDto().FromEntity(trait);
        }

        public async Task<TraitDto?> GetTraitByIdAsync(int id)
        {
            _logger.LogInformation($"Retrieving trait with ID {id}");
            var trait = await _context.Traits.FindAsync(id);
            return trait == null ? null : new TraitDto().FromEntity(trait);
        }

        public async Task<IEnumerable<TraitDto>> GetAllTraitsAsync()
        {
            _logger.LogInformation("Retrieving all traits");
            var traits = await _context.Traits.ToListAsync();
            return traits.Select(trait => new TraitDto().FromEntity(trait)).ToList();
        }

        public async Task<TraitDto?> UpdateTraitAsync(TraitDto traitDto)
        {
            if (traitDto == null)
            {
                _logger.LogWarning("TraitDto is null");
                return null;
            }

            var trait = await _context.Traits.FindAsync(traitDto.Id);
            if (trait == null)
            {
                _logger.LogWarning($"Trait with ID {traitDto.Id} not found");
                return null;
            }

            trait.TraitName = traitDto.TraitName;
            _context.Traits.Update(trait);
            await _context.SaveChangesAsync();

            return new TraitDto
            {
                Id = trait.Id,
                TraitName = trait.TraitName
            };
        }

        public async Task<bool> DeleteTraitAsync(int id)
        {
            _logger.LogInformation($"Deleting trait with ID {id}");
            var trait = await _context.Traits.FindAsync(id);
            if (trait == null)
            {
                _logger.LogWarning($"Trait with ID {id} not found");
                return false;
            }
            
            _context.Traits.Remove(trait);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Trait with ID {id} deleted successfully");
            return true;
        }
        
        public async Task<IEnumerable<TraitDto>> GetTraitsByPaperIdAsync(int paperId)
        {
            _logger.LogInformation($"Retrieving traits for paper ID {paperId}");
            var traits = await _context.Traits
                .Where(t => t.Papers.Any(p => p.Id == paperId))
                .ToListAsync();
            return traits.Select(trait => new TraitDto().FromEntity(trait)).ToList();
        }
    }
    
   
}