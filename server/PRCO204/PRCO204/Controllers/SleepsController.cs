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
    public class SleepsController : Controller
    {
        private readonly maindbContext _context;

        public SleepsController(maindbContext context)
        {
            _context = context;
        }

        // GET: Sleeps
        public async Task<IActionResult> Index()
        {
            var maindbContext = _context.Sleep.Include(s => s.User);
            return View(await maindbContext.ToListAsync());
        }

        // GET: Sleeps/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sleep = await _context.Sleep
                .Include(s => s.User)
                .FirstOrDefaultAsync(m => m.SleepId == id);
            if (sleep == null)
            {
                return NotFound();
            }

            return View(sleep);
        }

        // GET: Sleeps/Create
        public IActionResult Create()
        {
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email");
            return View();
        }

        // POST: Sleeps/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("SleepId,UserId,Awake,Light,Deep,Rem,SleepDate")] Sleep sleep)
        {
            if (ModelState.IsValid)
            {
                _context.Add(sleep);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", sleep.UserId);
            return View(sleep);
        }

        // GET: Sleeps/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sleep = await _context.Sleep.FindAsync(id);
            if (sleep == null)
            {
                return NotFound();
            }
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", sleep.UserId);
            return View(sleep);
        }

        // POST: Sleeps/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("SleepId,UserId,Awake,Light,Deep,Rem,SleepDate")] Sleep sleep)
        {
            if (id != sleep.SleepId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(sleep);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SleepExists(sleep.SleepId))
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
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", sleep.UserId);
            return View(sleep);
        }

        // GET: Sleeps/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sleep = await _context.Sleep
                .Include(s => s.User)
                .FirstOrDefaultAsync(m => m.SleepId == id);
            if (sleep == null)
            {
                return NotFound();
            }

            return View(sleep);
        }

        // POST: Sleeps/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var sleep = await _context.Sleep.FindAsync(id);
            _context.Sleep.Remove(sleep);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool SleepExists(int id)
        {
            return _context.Sleep.Any(e => e.SleepId == id);
        }
    }
}
