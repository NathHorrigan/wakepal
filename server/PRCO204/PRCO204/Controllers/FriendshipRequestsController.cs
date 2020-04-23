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
    public class FriendshipRequestsController : ControllerBase
    {
        private readonly maindbContext _context;

        public FriendshipRequestsController(maindbContext context)
        {
            _context = context;
        }

        // GET: api/FriendshipRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FriendshipRequests>>> GetFriendshipRequests()
        {
            return await _context.FriendshipRequests.ToListAsync();
        }

        // GET: api/FriendshipRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FriendshipRequests>> GetFriendshipRequests(int id)
        {
            var friendshipRequests = await _context.FriendshipRequests.FindAsync(id);

            if (friendshipRequests == null)
            {
                return NotFound();
            }

            return friendshipRequests;
        }

        // PUT: api/FriendshipRequests/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFriendshipRequests(int id, FriendshipRequests friendshipRequests)
        {
            if (id != friendshipRequests.RequestId)
            {
                return BadRequest();
            }

            _context.Entry(friendshipRequests).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FriendshipRequestsExists(id))
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

        // POST: api/FriendshipRequests
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<FriendshipRequests>> PostFriendshipRequests(FriendshipRequests friendshipRequests)
        {
            _context.FriendshipRequests.Add(friendshipRequests);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FriendshipRequestsExists(friendshipRequests.RequestId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetFriendshipRequests", new { id = friendshipRequests.RequestId }, friendshipRequests);
        }

        // DELETE: api/FriendshipRequests/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FriendshipRequests>> DeleteFriendshipRequests(int id)
        {
            var friendshipRequests = await _context.FriendshipRequests.FindAsync(id);
            if (friendshipRequests == null)
            {
                return NotFound();
            }

            _context.FriendshipRequests.Remove(friendshipRequests);
            await _context.SaveChangesAsync();

            return friendshipRequests;
        }

        private bool FriendshipRequestsExists(int id)
        {
            return _context.FriendshipRequests.Any(e => e.RequestId == id);
        }
    }
}
