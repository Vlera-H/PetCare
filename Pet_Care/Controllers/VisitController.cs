using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pet_Care.Data;
using Pet_Care.Models.DTOs;
using Pet_Care.Models.Entities;
using System.Globalization;

namespace Pet_Care.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VisitController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VisitDto>>> GetAll()
        {
            var visits = await _context.Visits
                .Select(v => new VisitDto
                {
                    Id = v.Id,
                    VisitDate = v.VisitDate.ToString("yyyy-MM-dd"),
                    Reason = v.Reason,
                    PetId = v.PetId
                })
                .ToListAsync();

            return Ok(visits);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VisitDto>> Get(int id)
        {
            var visit = await _context.Visits.FindAsync(id);
            if (visit == null)
                return NotFound();

            return new VisitDto
            {
                Id = visit.Id,
                VisitDate = visit.VisitDate.ToString("yyyy-MM-dd"),
                Reason = visit.Reason,
                PetId = visit.PetId
            };
        }

        [HttpPost]
        public async Task<ActionResult<VisitDto>> Create(CreateVisitDto dto)
        {
            var visit = new Visit
            {
                VisitDate = dto.VisitDate,
                Reason = dto.Reason,
                PetId = dto.PetId
            };

            _context.Visits.Add(visit);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = visit.Id }, new VisitDto
            {
                Id = visit.Id,
                VisitDate = visit.VisitDate.ToString("yyyy-MM-dd"),
                Reason = visit.Reason,
                PetId = visit.PetId
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateVisitDto dto)
        {
            var visit = await _context.Visits.FindAsync(id);
            if (visit == null)
                return NotFound();

            visit.Reason = dto.Reason;

            try
            {
                visit.VisitDate = DateOnly.ParseExact(dto.VisitDate, "dd-MM-yyyy", CultureInfo.InvariantCulture);
            }
            catch (FormatException)
            {
                return BadRequest("Data duhet të jetë në formatin dd-MM-yyyy.");
            }

            visit.PetId = dto.PetId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var visit = await _context.Visits.FindAsync(id);
            if (visit == null)
                return NotFound();

            _context.Visits.Remove(visit);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
