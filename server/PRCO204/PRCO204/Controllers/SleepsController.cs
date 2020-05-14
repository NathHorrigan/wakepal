using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRCO204.Models;
using Microsoft.AspNetCore.Authorization;


namespace PRCO204.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SleepsController : ControllerBase
    {
        private readonly maindbContext _context;

        public SleepsController(maindbContext context)
        {
            _context = context;
        }

        // GET: api/Sleeps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sleep>>> GetSleep()
        {
            return await _context.Sleep.ToListAsync();
        }

        // GET: api/Sleeps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sleep>> GetSleep(int id)
        {
            var sleep = await _context.Sleep.FindAsync(id);

            if (sleep == null)
            {
                return NotFound();
            }

            return sleep;
        }

        // PUT: api/Sleeps/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSleep(int id, Sleep sleep)
        {
            if (id != sleep.SleepId)
            {
                return BadRequest();
            }

            _context.Entry(sleep).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SleepExists(id))
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

        // POST: api/Sleeps
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Sleep>> PostSleep(Sleep sleep)
        {
            _context.Sleep.Add(sleep);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SleepExists(sleep.SleepId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSleep", new { id = sleep.SleepId }, sleep);
        }

        // DELETE: api/Sleeps/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Sleep>> DeleteSleep(int id)
        {
            var sleep = await _context.Sleep.FindAsync(id);
            if (sleep == null)
            {
                return NotFound();
            }

            _context.Sleep.Remove(sleep);
            await _context.SaveChangesAsync();

            return sleep;
        }

        private bool SleepExists(int id)
        {
            return _context.Sleep.Any(e => e.SleepId == id);
        }
    }
}
