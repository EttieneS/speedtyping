using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpeedTyping.Models;


namespace SpeedTyping.Data
{
    public class SpeedTypingContext : DbContext
    {
        public SpeedTypingContext(DbContextOptions<SpeedTypingContext> options)
            : base(options) { }

        public DbSet<SpeedTyping.Models.User> User { get; set; }
    }
}
