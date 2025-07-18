using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pet_Care.Data;
using Pet_Care.Models.DTO;
using Pet_Care.Models.Entities;
using System.Globalization;

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
            var pets = dbContext.Pets
                .Select(p => new PetDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Breed = p.Breed,
                    BirthDate = p.BirthDate.ToString("yyyy-MM-dd"),
                    UserId = p.UserId
                })
                .ToList();

            return Ok(pets);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var pet = dbContext.Pets
                .Where(p => p.Id == id)
                .Select(p => new PetDto
                {
                    Id = p.Id,
                    Name = p.Name,
                    Breed = p.Breed,
                    BirthDate = p.BirthDate.ToString("yyyy-MM-dd"),
                    UserId = p.UserId
                })
                .FirstOrDefault();

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

            return CreatedAtAction(nameof(Get), new { id = pet.Id }, new PetDto
            {
                Id = pet.Id,
                Name = pet.Name,
                Breed = pet.Breed,
                BirthDate = pet.BirthDate.ToString("dd.MM.yyyy"), // output i formatit që dëshiron
                UserId = pet.UserId
            });
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

            // Konverto me format specifik "dd-MM-yyyy"
            try
            {
                pet.BirthDate = DateTime.ParseExact(
                    petDto.BirthDate,
                    "dd-MM-yyyy",
                    System.Globalization.CultureInfo.InvariantCulture
                );
            }
            catch (FormatException)
            {
                return BadRequest("Data duhet të jetë në formatin dd-MM-yyyy, p.sh. 18-07-2025.");
            }

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
