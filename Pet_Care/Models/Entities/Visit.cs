using System;

namespace Pet_Care.Models.Entities
{
    public class Visit
    {
        public int Id { get; set; }
        public DateTime VisitDate { get; set; }
        public string Reason { get; set; }


        public int PetId { get; set; }
        public Pet Pet { get; set; }
    }
}
