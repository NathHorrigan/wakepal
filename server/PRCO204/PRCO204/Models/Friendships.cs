using System;
using System.Collections.Generic;

namespace PRCO204.Models
{
    public partial class Friendships
    {
        public int FriendshipId { get; set; }
        public int UserId { get; set; }
        public int FriendId { get; set; }

        public virtual Users Friend { get; set; }
        public virtual Users User { get; set; }
    }
}
