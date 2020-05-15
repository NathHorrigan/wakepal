using System;
using System.Collections.Generic;

namespace WakePal_WebApp.Models
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

        public PasswordResets PasswordResets { get; set; }
        public ICollection<DailyFitness> DailyFitness { get; set; }
        public ICollection<FriendshipRequests> FriendshipRequestsRecipient { get; set; }
        public ICollection<FriendshipRequests> FriendshipRequestsRequestor { get; set; }
        public ICollection<Friendships> FriendshipsFriend { get; set; }
        public ICollection<Friendships> FriendshipsUser { get; set; }
        public ICollection<Sleep> Sleep { get; set; }
    }
}
