namespace Pet_Care.Models.DTOs
{
    public class VisitDto
    {
        public int Id { get; set; }
        public string VisitDate { get; set; }  
        public string Reason { get; set; }
        public int PetId { get; set; }
    }
}
