using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pet_Care.Data;
using Pet_Care.Models.DTO;
using Pet_Care.Models.DTO.Pet_Care.Models.DTOs;
using Pet_Care.Models.Entities;
using System.Globalization;

namespace Pet_Care.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CareTaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CareTaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/CareTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CareTaskDto>>> GetCareTasks()
        {
            return await _context.CareTasks
                .Select(ct => new CareTaskDto
                {
                    Id = ct.Id,
                    Description = ct.Description,
                    DueDate = ct.DueDate.ToString("yyyy-MM-dd"),
                    IsCompleted = ct.IsCompleted,
                    PetId = ct.PetId
                })
                .ToListAsync();
        }

        // GET: api/CareTask/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CareTaskDto>> GetCareTask(int id)
        {
            var careTask = await _context.CareTasks.FindAsync(id);
            if (careTask == null)
                return NotFound();

            return new CareTaskDto
            {
                Id = careTask.Id,
                Description = careTask.Description,
                DueDate = careTask.DueDate.ToString("yyyy-MM-dd"),
                IsCompleted = careTask.IsCompleted,
                PetId = careTask.PetId
            };
        }

        // POST: api/CareTask
        // POST: api/CareTask
        [HttpPost]
        public async Task<ActionResult<CareTaskDto>> CreateCareTask(CreateCareTaskDto dto)
        {
            var careTask = new CareTask
            {
                Description = dto.Description,
                DueDate = dto.DueDate, // Tash është DateOnly, nuk ka nevojë për .Date
                PetId = dto.PetId,
                IsCompleted = false
            };

            _context.CareTasks.Add(careTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCareTask), new { id = careTask.Id }, new CareTaskDto
            {
                Id = careTask.Id,
                Description = careTask.Description,
                DueDate = careTask.DueDate.ToString("yyyy-MM-dd"),
                IsCompleted = careTask.IsCompleted,
                PetId = careTask.PetId
            });
        }

        // PUT: api/CareTask/5
        // PUT: api/CareTask/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCareTask(int id, UpdateCareTaskDto dto)
        {
            var careTask = await _context.CareTasks.FindAsync(id);
            if (careTask == null)
                return NotFound();

            careTask.Description = dto.Description;

            try
            {
                // Përdor DateOnly.ParseExact në vend të DateTime
                careTask.DueDate = DateOnly.ParseExact(dto.DueDate, "dd-MM-yyyy", CultureInfo.InvariantCulture);
            }
            catch (FormatException)
            {
                return BadRequest("Data duhet të jetë në formatin dd-MM-yyyy.");
            }

            careTask.IsCompleted = dto.IsCompleted;
            careTask.PetId = dto.PetId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/CareTask/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCareTask(int id)
        {
            var careTask = await _context.CareTasks.FindAsync(id);
            if (careTask == null)
                return NotFound();

            _context.CareTasks.Remove(careTask);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}


