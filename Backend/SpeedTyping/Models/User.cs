using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SpeedTyping.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime DateCreated { get; set; }
        public int IdNumber { get; set; }
        public int CellNumber { get; set; }
        public int Score { get; set; }
        public bool Competition { get; set; }

        /*public User()
        {
            this.DateCreated = DateTime.Now;

            Random rnd = new Random();
            int rndRating = rnd.Next(0, 501);
            this.Score = rndRating;
        }*/
    }
}
