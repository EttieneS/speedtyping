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
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(15, ErrorMessage ="Competitor name may be no longer than 15 characters")]
        public string Name { get; set; }
        public string LastName { get; set; }
        [Timestamp]
        public DateTime DateCreated { get; set; }
        [Required]
        [MaxLength(13)]
        public int IdNumber { get; set; }
        public int Score { get; set; }
        [DefaultValue(true)]
        public bool Competition { get; set; }
    }
}
