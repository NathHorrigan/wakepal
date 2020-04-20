﻿using System;
using System.Collections.Generic;

namespace PRCO204.Models
{
    public partial class DailyFitness
    {
        public int FitnessId { get; set; }
        public int UserId { get; set; }
        public DateTime FitnessDate { get; set; }
        public decimal Weight { get; set; }
        public int? Steps { get; set; }
        public int? Water { get; set; }
        public int? Calories { get; set; }
        public int? Floors { get; set; }

        public virtual Users User { get; set; }
    }
}
