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
    public class FriendshipsController : Controller
    {
        private readonly maindbContext _context;

        public FriendshipsController(maindbContext context)
        {
            _context = context;
        }

        // GET: Friendships
        public async Task<IActionResult> Index()
        {
            var maindbContext = _context.Friendships.Include(f => f.Friend).Include(f => f.User);
            return View(await maindbContext.ToListAsync());
        }

        // GET: Friendships/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var friendships = await _context.Friendships
                .Include(f => f.Friend)
                .Include(f => f.User)
                .FirstOrDefaultAsync(m => m.FriendshipId == id);
            if (friendships == null)
            {
                return NotFound();
            }

            return View(friendships);
        }

        // GET: Friendships/Create
        public IActionResult Create()
        {
            ViewData["FriendId"] = new SelectList(_context.Users, "UserId", "Email");
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email");
            return View();
        }

        // POST: Friendships/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("FriendshipId,UserId,FriendId")] Friendships friendships)
        {
            if (ModelState.IsValid)
            {
                _context.Add(friendships);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["FriendId"] = new SelectList(_context.Users, "UserId", "Email", friendships.FriendId);
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", friendships.UserId);
            return View(friendships);
        }

        // GET: Friendships/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var friendships = await _context.Friendships.FindAsync(id);
            if (friendships == null)
            {
                return NotFound();
            }
            ViewData["FriendId"] = new SelectList(_context.Users, "UserId", "Email", friendships.FriendId);
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", friendships.UserId);
            return View(friendships);
        }

        // POST: Friendships/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("FriendshipId,UserId,FriendId")] Friendships friendships)
        {
            if (id != friendships.FriendshipId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(friendships);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FriendshipsExists(friendships.FriendshipId))
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
            ViewData["FriendId"] = new SelectList(_context.Users, "UserId", "Email", friendships.FriendId);
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", friendships.UserId);
            return View(friendships);
        }

        // GET: Friendships/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var friendships = await _context.Friendships
                .Include(f => f.Friend)
                .Include(f => f.User)
                .FirstOrDefaultAsync(m => m.FriendshipId == id);
            if (friendships == null)
            {
                return NotFound();
            }

            return View(friendships);
        }

        // POST: Friendships/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var friendships = await _context.Friendships.FindAsync(id);
            _context.Friendships.Remove(friendships);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool FriendshipsExists(int id)
        {
            return _context.Friendships.Any(e => e.FriendshipId == id);
        }
    }
}
