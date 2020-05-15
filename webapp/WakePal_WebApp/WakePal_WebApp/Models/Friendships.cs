using System;
using System.Collections.Generic;

namespace WakePal_WebApp.Models
{
    public partial class Friendships
    {
        public int FriendshipId { get; set; }
        public int UserId { get; set; }
        public int FriendId { get; set; }

        public Users Friend { get; set; }
        public Users User { get; set; }
    }
}
