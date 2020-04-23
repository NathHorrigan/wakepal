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
    public class FriendshipsController : ControllerBase
    {
        private readonly maindbContext _context;

        public FriendshipsController(maindbContext context)
        {
            _context = context;
        }

        // GET: api/Friendships
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Friendships>>> GetFriendships()
        {
            return await _context.Friendships.ToListAsync();
        }

        // GET: api/Friendships/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Friendships>> GetFriendships(int id)
        {
            var friendships = await _context.Friendships.FindAsync(id);

            if (friendships == null)
            {
                return NotFound();
            }

            return friendships;
        }

        // PUT: api/Friendships/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFriendships(int id, Friendships friendships)
        {
            if (id != friendships.FriendshipId)
            {
                return BadRequest();
            }

            _context.Entry(friendships).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FriendshipsExists(id))
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

        // POST: api/Friendships
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Friendships>> PostFriendships(Friendships friendships)
        {
            _context.Friendships.Add(friendships);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FriendshipsExists(friendships.FriendshipId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFriendships", new { id = friendships.FriendshipId }, friendships);
        }

        // DELETE: api/Friendships/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Friendships>> DeleteFriendships(int id)
        {
            var friendships = await _context.Friendships.FindAsync(id);
            if (friendships == null)
            {
                return NotFound();
            }

            _context.Friendships.Remove(friendships);
            await _context.SaveChangesAsync();

            return friendships;
        }

        private bool FriendshipsExists(int id)
        {
            return _context.Friendships.Any(e => e.FriendshipId == id);
        }
    }
}
