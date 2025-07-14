using System;

namespace Pet_Care.Models.Entities
{
    public class Pet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Breed { get; set; }
        public DateTime BirthDate { get; set; }

     
        public int UserId { get; set; }
        public User User { get; set; }

        public ICollection<Visit> Visits { get; set; }
        public ICollection<CareTask> CareTasks { get; set; }
    }
}
