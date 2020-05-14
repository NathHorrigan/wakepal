using System;
using System.Collections.Generic;

namespace PRCO204.Models
{
    public partial class Users
    {
        public Users()
        {
            DailyFitness = new HashSet<DailyFitness>();
            FriendshipRequestsRecipient = new HashSet<FriendshipRequests>();
            FriendshipRequestsRequestor = new HashSet<FriendshipRequests>();
            FriendshipsFriend = new HashSet<Friendships>();
            FriendshipsUser = new HashSet<Friendships>();
            Sleep = new HashSet<Sleep>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public decimal Height { get; set; }
        public decimal Weight { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }


        public virtual PasswordResets PasswordResets { get; set; }
        public virtual ICollection<DailyFitness> DailyFitness { get; set; }
        public virtual ICollection<FriendshipRequests> FriendshipRequestsRecipient { get; set; }
        public virtual ICollection<FriendshipRequests> FriendshipRequestsRequestor { get; set; }
        public virtual ICollection<Friendships> FriendshipsFriend { get; set; }
        public virtual ICollection<Friendships> FriendshipsUser { get; set; }
        public virtual ICollection<Sleep> Sleep { get; set; }
    }
}
