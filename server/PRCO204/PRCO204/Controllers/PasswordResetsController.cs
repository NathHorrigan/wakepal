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
    public class PasswordResetsController : ControllerBase
    {
        private readonly maindbContext _context;

        public PasswordResetsController(maindbContext context)
        {
            _context = context;
        }

        // GET: api/PasswordResets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PasswordResets>>> GetPasswordResets()
        {
            return await _context.PasswordResets.ToListAsync();
        }

        // GET: api/PasswordResets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PasswordResets>> GetPasswordResets(int id)
        {
            var passwordResets = await _context.PasswordResets.FindAsync(id);

            if (passwordResets == null)
            {
                return NotFound();
            }

            return passwordResets;
        }

        // PUT: api/PasswordResets/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPasswordResets(int id, PasswordResets passwordResets)
        {
            if (id != passwordResets.ResetId)
            {
                return BadRequest();
            }

            _context.Entry(passwordResets).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PasswordResetsExists(id))
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

        // POST: api/PasswordResets
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<PasswordResets>> PostPasswordResets(PasswordResets passwordResets)
        {
            _context.PasswordResets.Add(passwordResets);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PasswordResetsExists(passwordResets.ResetId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPasswordResets", new { id = passwordResets.ResetId }, passwordResets);
        }

        // DELETE: api/PasswordResets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PasswordResets>> DeletePasswordResets(int id)
        {
            var passwordResets = await _context.PasswordResets.FindAsync(id);
            if (passwordResets == null)
            {
                return NotFound();
            }

            _context.PasswordResets.Remove(passwordResets);
            await _context.SaveChangesAsync();

            return passwordResets;
        }

        private bool PasswordResetsExists(int id)
        {
            return _context.PasswordResets.Any(e => e.ResetId == id);
        }
    }
}
