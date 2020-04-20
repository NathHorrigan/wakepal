using System;
using System.Collections.Generic;

namespace PRCO204.Models
{
    public partial class FriendshipRequests
    {
        public int RequestId { get; set; }
        public int RequestorId { get; set; }
        public int RecipientId { get; set; }
        public bool? Accepted { get; set; }

        public virtual Users Recipient { get; set; }
        public virtual Users Requestor { get; set; }
    }
}
