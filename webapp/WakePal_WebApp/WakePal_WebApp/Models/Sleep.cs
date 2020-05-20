using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WakePal_WebApp.Models
{
    public class Sleep
    {
        public int SleepId { get; set; }
        public int UserId { get; set; }
        public TimeSpan? Awake { get; set; }
        public TimeSpan? Light { get; set; }
        public TimeSpan? Deep { get; set; }
        public TimeSpan? Rem { get; set; }
        public DateTime SleepDate { get; set; }
        
        public Users User { get; set; }
    }
}
