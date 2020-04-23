using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using PRCO204.Models;

namespace PRCO204.Controllers
{
    public class FriendshipRequestsController : Controller
    {
        private readonly maindbContext _context;

        public FriendshipRequestsController(maindbContext context)
        {
            _context = context;
        }

        // GET: FriendshipRequests
        public async Task<IActionResult> Index()
        {
            var maindbContext = _context.FriendshipRequests.Include(f => f.Recipient).Include(f => f.Requestor);
            return View(await maindbContext.ToListAsync());
        }

        // GET: FriendshipRequests/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var friendshipRequests = await _context.FriendshipRequests
                .Include(f => f.Recipient)
                .Include(f => f.Requestor)
                .FirstOrDefaultAsync(m => m.RequestId == id);
            if (friendshipRequests == null)
            {
                return NotFound();
            }

            return View(friendshipRequests);
        }

        // GET: FriendshipRequests/Create
        public IActionResult Create()
        {
            ViewData["RecipientId"] = new SelectList(_context.Users, "UserId", "Email");
            ViewData["RequestorId"] = new SelectList(_context.Users, "UserId", "Email");
            return View();
        }

        // POST: FriendshipRequests/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("RequestId,RequestorId,RecipientId,Accepted")] FriendshipRequests friendshipRequests)
        {
            if (ModelState.IsValid)
            {
                _context.Add(friendshipRequests);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["RecipientId"] = new SelectList(_context.Users, "UserId", "Email", friendshipRequests.RecipientId);
            ViewData["RequestorId"] = new SelectList(_context.Users, "UserId", "Email", friendshipRequests.RequestorId);
            return View(friendshipRequests);
        }

        // GET: FriendshipRequests/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var friendshipRequests = await _context.FriendshipRequests.FindAsync(id);
            if (friendshipRequests == null)
            {
                return NotFound();
            }
            ViewData["RecipientId"] = new SelectList(_context.Users, "UserId", "Email", friendshipRequests.RecipientId);
            ViewData["RequestorId"] = new SelectList(_context.Users, "UserId", "Email", friendshipRequests.RequestorId);
            return View(friendshipRequests);
        }

        // POST: FriendshipRequests/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("RequestId,RequestorId,RecipientId,Accepted")] FriendshipRequests friendshipRequests)
        {
            if (id != friendshipRequests.RequestId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(friendshipRequests);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FriendshipRequestsExists(friendshipRequests.RequestId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["RecipientId"] = new SelectList(_context.Users, "UserId", "Email", friendshipRequests.RecipientId);
            ViewData["RequestorId"] = new SelectList(_context.Users, "UserId", "Email", friendshipRequests.RequestorId);
            return View(friendshipRequests);
        }

        // GET: FriendshipRequests/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var friendshipRequests = await _context.FriendshipRequests
                .Include(f => f.Recipient)
                .Include(f => f.Requestor)
                .FirstOrDefaultAsync(m => m.RequestId == id);
            if (friendshipRequests == null)
            {
                return NotFound();
            }

            return View(friendshipRequests);
        }

        // POST: FriendshipRequests/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var friendshipRequests = await _context.FriendshipRequests.FindAsync(id);
            _context.FriendshipRequests.Remove(friendshipRequests);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool FriendshipRequestsExists(int id)
        {
            return _context.FriendshipRequests.Any(e => e.RequestId == id);
        }
    }
}
