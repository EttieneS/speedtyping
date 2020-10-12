using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SpeedTyping.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Score { get; set; }
        public bool Competition { get; set; }
    }
}
