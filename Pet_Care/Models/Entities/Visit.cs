using System;

namespace Pet_Care.Models.Entities
{
    public class Visit
    {
        public int Id { get; set; }
        public DateOnly VisitDate { get; set; }
        public string Reason { get; set; }


        public int PetId { get; set; }
        public Pet Pet { get; set; }
    }
}
