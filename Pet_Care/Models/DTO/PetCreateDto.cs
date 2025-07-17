using System.ComponentModel.DataAnnotations;
namespace Pet_Care.Models.DTO
{
    public class PetCreateDto
    {
        public string Name { get; set; }
        public string Breed { get; set; }
        public DateTime BirthDate { get; set; }
        public int UserId { get; set; }
    }
}
