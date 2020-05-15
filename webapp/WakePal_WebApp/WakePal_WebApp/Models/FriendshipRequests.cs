using System;
using System.Collections.Generic;

namespace WakePal_WebApp.Models
{
    public partial class FriendshipRequests
    {
        public int RequestId { get; set; }
        public int RequestorId { get; set; }
        public int RecipientId { get; set; }
        public bool? Accepted { get; set; }

        public Users Recipient { get; set; }
        public Users Requestor { get; set; }
    }
}
