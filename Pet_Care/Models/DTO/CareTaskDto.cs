using System.Text.Json.Serialization;

namespace Pet_Care.Models.DTO
{
    namespace Pet_Care.Models.DTOs
    {
        public class CareTaskDto
        {
            public int Id { get; set; }
            public string Description { get; set; }

            public String DueDate { get; set; }
            public bool IsCompleted { get; set; }
            public int PetId { get; set; }
        }
    }
}

