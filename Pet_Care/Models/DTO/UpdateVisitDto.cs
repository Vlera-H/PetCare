namespace Pet_Care.Models.DTOs
{
    public class UpdateVisitDto
    {
        public string VisitDate { get; set; } 
        public string Reason { get; set; }
        public int PetId { get; set; }
    }
}
