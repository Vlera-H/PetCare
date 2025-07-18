namespace Pet_Care.Models.DTO
{
    public class CreateCareTaskDto
    {
        public string Description { get; set; }
        public DateOnly DueDate { get; set; }
        public int PetId { get; set; }
    }
}
