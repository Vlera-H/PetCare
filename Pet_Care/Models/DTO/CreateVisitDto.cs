namespace Pet_Care.Models.DTOs
{
    public class CreateVisitDto
    {
        public DateOnly VisitDate { get; set; } 
        public string Reason { get; set; }
        public int PetId { get; set; }
    }
}
