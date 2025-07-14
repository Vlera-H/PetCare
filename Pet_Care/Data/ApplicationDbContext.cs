using Microsoft.EntityFrameworkCore;
using Pet_Care.Models.Entities;

namespace Pet_Care.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Pet> Pets { get; set; }
        public DbSet<Visit> Visits { get; set; }
        public DbSet<CareTask> CareTasks { get; set; }
    }
}
