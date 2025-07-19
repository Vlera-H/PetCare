using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pet_Care.Data;
using Pet_Care.Models.Entities;
using Pet_Care.Models.DTOs;
using System.Globalization;

[Route("api/[controller]")]
[ApiController]
public class VisitController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public VisitController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET: api/Vis
    [HttpGet]
    public async Task<ActionResult<IEnumerable<VisitDto>>> GetVisits()
    {
        return await _context.Visits
            .Select(v => new VisitDto
            {
                Id = v.Id,
                VisitDate = v.VisitDate.ToString("yyyy-MM-dd"),
                Reason = v.Reason,
                PetId = v.PetId
            })
            .ToListAsync();
    }

    // GET: api/Vis/5
    [HttpGet("{id}")]
    public async Task<ActionResult<VisitDto>> GetVisit(int id)
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

    // POST: api/Vis
    [HttpPost]
    public async Task<ActionResult<VisitDto>> CreateVisit(CreateVisitDto dto)
    {
        var visit = new Visit
        {
            VisitDate = dto.VisitDate,
            Reason = dto.Reason,
            PetId = dto.PetId
        };

        _context.Visits.Add(visit);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetVisit), new { id = visit.Id }, new VisitDto
        {
            Id = visit.Id,
            VisitDate = visit.VisitDate.ToString("yyyy-MM-dd"),
            Reason = visit.Reason,
            PetId = visit.PetId
        });
    }

    // PUT: api/Vis/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVisit(int id, UpdateVisitDto dto)
    {
        var visit = await _context.Visits.FindAsync(id);
        if (visit == null)
            return NotFound();

        try
        {
            visit.VisitDate = DateOnly.ParseExact(dto.VisitDate, "dd-MM-yyyy", CultureInfo.InvariantCulture);
        }
        catch (FormatException)
        {
            return BadRequest("Data duhet të jetë në formatin dd-MM-yyyy.");
        }

        visit.Reason = dto.Reason;
        visit.PetId = dto.PetId;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/Vis/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVisit(int id)
    {
        var visit = await _context.Visits.FindAsync(id);
        if (visit == null)
            return NotFound();

        _context.Visits.Remove(visit);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
