using System;
using System.Collections.Generic;

namespace PRCO204.Models
{
    public partial class PasswordResets
    {
        public int ResetId { get; set; }
        public int UserId { get; set; }
        public string Code { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpirationDate { get; set; }

        public virtual Users Reset { get; set; }
    }
}
