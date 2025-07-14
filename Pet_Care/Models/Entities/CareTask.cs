using System;

namespace Pet_Care.Models.Entities
{
    public class CareTask
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }

   
        public int PetId { get; set; }
        public Pet Pet { get; set; }
    }
}
