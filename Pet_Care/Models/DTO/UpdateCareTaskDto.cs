namespace Pet_Care.Models.DTO
{
    public class UpdateCareTaskDto
    {
        public string Description { get; set; }
        public string DueDate { get; set; } 
        public bool IsCompleted { get; set; }
        public int PetId { get; set; }
    }
}
