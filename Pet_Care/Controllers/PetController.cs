using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pet_Care.Data;
using Pet_Care.Models.Entities;
using Pet_Care.Models.DTO;

namespace Pet_Care.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public PetController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/Pet
        [HttpGet]
        public IActionResult GetAll()
        {
            var pets = dbContext.Pets.ToList();
            return Ok(pets);
        }

        // GET: api/Pet/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var pet = dbContext.Pets.Find(id);
            if (pet == null)
                return NotFound();

            return Ok(pet);
        }

        // POST: api/Pet
        [HttpPost]
        public IActionResult Create([FromBody] PetCreateDto petDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = new Pet
            {
                Name = petDto.Name,
                Breed = petDto.Breed,
                BirthDate = petDto.BirthDate,
                UserId = petDto.UserId
            };

            dbContext.Pets.Add(pet);
            dbContext.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = pet.Id }, pet);
        }

        // PUT: api/Pet/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] PetUpdateDto petDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var pet = dbContext.Pets.Find(id);
            if (pet == null)
                return NotFound();

            pet.Name = petDto.Name;
            pet.Breed = petDto.Breed;
            pet.BirthDate = petDto.BirthDate;

            dbContext.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Pet/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var pet = dbContext.Pets.Find(id);
            if (pet == null)
                return NotFound();

            dbContext.Pets.Remove(pet);
            dbContext.SaveChanges();

            return NoContent();
        }
    }
}
