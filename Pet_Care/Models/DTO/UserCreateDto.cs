using System.ComponentModel.DataAnnotations;

namespace Pet_Care.Models.DTO
{
    public class UserCreateDto
    {
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; }  

        public DateTime? DateOfBirth { get; set; }

    }
}
