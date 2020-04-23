using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRCO204.Models;

namespace PRCO204.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DailyFitnessesController : ControllerBase
    {
        private readonly maindbContext _context;

        public DailyFitnessesController(maindbContext context)
        {
            _context = context;
        }

        // GET: api/DailyFitnesses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DailyFitness>>> GetDailyFitness()
        {
            return await _context.DailyFitness.ToListAsync();
        }

        // GET: api/DailyFitnesses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DailyFitness>> GetDailyFitness(int id)
        {
            var dailyFitness = await _context.DailyFitness.FindAsync(id);

            if (dailyFitness == null)
            {
                return NotFound();
            }

            return dailyFitness;
        }

        // PUT: api/DailyFitnesses/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDailyFitness(int id, DailyFitness dailyFitness)
        {
            if (id != dailyFitness.FitnessId)
            {
                return BadRequest();
            }

            _context.Entry(dailyFitness).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DailyFitnessExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DailyFitnesses
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<DailyFitness>> PostDailyFitness(DailyFitness dailyFitness)
        {
            _context.DailyFitness.Add(dailyFitness);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DailyFitnessExists(dailyFitness.FitnessId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDailyFitness", new { id = dailyFitness.FitnessId }, dailyFitness);
        }

        // DELETE: api/DailyFitnesses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DailyFitness>> DeleteDailyFitness(int id)
        {
            var dailyFitness = await _context.DailyFitness.FindAsync(id);
            if (dailyFitness == null)
            {
                return NotFound();
            }

            _context.DailyFitness.Remove(dailyFitness);
            await _context.SaveChangesAsync();

            return dailyFitness;
        }

        private bool DailyFitnessExists(int id)
        {
            return _context.DailyFitness.Any(e => e.FitnessId == id);
        }
    }
}
