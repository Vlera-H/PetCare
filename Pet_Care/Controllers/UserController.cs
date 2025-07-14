using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pet_Care.Data;
using Pet_Care.Models.Entities;
using Pet_Care.Models.DTO;

namespace Pet_Care.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public UserController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/Users
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = dbContext.Users.ToList();
            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = dbContext.Users.Find(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        // POST: api/Users
        [HttpPost]
        public IActionResult Create([FromBody] UserCreateDto userDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = new User
            {
                FullName = userDto.FullName,
                Email = userDto.Email,
                PasswordHash = HashPassword(userDto.Password),
                PhoneNumber = userDto.PhoneNumber,
                DateOfBirth = userDto.DateOfBirth,
                IsActive = true,
                Pets = new List<Pet>()
            };

            dbContext.Users.Add(user);
            dbContext.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }

        private string HashPassword(string password)
        {
            using (var sha = System.Security.Cryptography.SHA256.Create())
            {
                var bytes = System.Text.Encoding.UTF8.GetBytes(password);
                var hashBytes = sha.ComputeHash(bytes);
                return Convert.ToBase64String(hashBytes);
            }
        }



        // PUT: api/Users/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] UserUpdateDto userDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = dbContext.Users.Find(id);
            if (user == null)
                return NotFound();

            // Përditëso fushat që dëshiron
            user.FullName = userDto.FullName;
            user.Email = userDto.Email;
            user.PhoneNumber = userDto.PhoneNumber;
            user.DateOfBirth = userDto.DateOfBirth;
            user.IsActive = userDto.IsActive;

            dbContext.SaveChanges();

            return NoContent();
        }


        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = dbContext.Users.Find(id);
            if (user == null)
                return NotFound();

            dbContext.Users.Remove(user);
            dbContext.SaveChanges();

            return NoContent();
        }
    }
}

