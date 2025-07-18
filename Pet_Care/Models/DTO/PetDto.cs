namespace Pet_Care.Models.DTO
{
    public class PetDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Breed { get; set; }
        public string BirthDate { get; set; }  // <-- E ndryshon nga DateTime ne string
        public int UserId { get; set; }
    }
}
