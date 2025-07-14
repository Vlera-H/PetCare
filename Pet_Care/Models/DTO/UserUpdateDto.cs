using System.ComponentModel.DataAnnotations;

namespace Pet_Care.Models.DTO
{
    public class UserUpdateDto
    {
        public string FullName { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        // Nëse dëshiron, shtu fushat shtesë që mund të përditësohen
        public string? PhoneNumber { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public bool IsActive { get; set; }
    }
}
