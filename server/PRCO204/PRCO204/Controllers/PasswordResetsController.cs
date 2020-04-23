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
    public class PasswordResetsController : Controller
    {
        private readonly maindbContext _context;

        public PasswordResetsController(maindbContext context)
        {
            _context = context;
        }

        // GET: PasswordResets
        public async Task<IActionResult> Index()
        {
            var maindbContext = _context.PasswordResets.Include(p => p.Reset);
            return View(await maindbContext.ToListAsync());
        }

        // GET: PasswordResets/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var passwordResets = await _context.PasswordResets
                .Include(p => p.Reset)
                .FirstOrDefaultAsync(m => m.ResetId == id);
            if (passwordResets == null)
            {
                return NotFound();
            }

            return View(passwordResets);
        }

        // GET: PasswordResets/Create
        public IActionResult Create()
        {
            ViewData["ResetId"] = new SelectList(_context.Users, "UserId", "Email");
            return View();
        }

        // POST: PasswordResets/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ResetId,UserId,Code,CreationDate,ExpirationDate")] PasswordResets passwordResets)
        {
            if (ModelState.IsValid)
            {
                _context.Add(passwordResets);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["ResetId"] = new SelectList(_context.Users, "UserId", "Email", passwordResets.ResetId);
            return View(passwordResets);
        }

        // GET: PasswordResets/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var passwordResets = await _context.PasswordResets.FindAsync(id);
            if (passwordResets == null)
            {
                return NotFound();
            }
            ViewData["ResetId"] = new SelectList(_context.Users, "UserId", "Email", passwordResets.ResetId);
            return View(passwordResets);
        }

        // POST: PasswordResets/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ResetId,UserId,Code,CreationDate,ExpirationDate")] PasswordResets passwordResets)
        {
            if (id != passwordResets.ResetId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(passwordResets);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PasswordResetsExists(passwordResets.ResetId))
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
            ViewData["ResetId"] = new SelectList(_context.Users, "UserId", "Email", passwordResets.ResetId);
            return View(passwordResets);
        }

        // GET: PasswordResets/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var passwordResets = await _context.PasswordResets
                .Include(p => p.Reset)
                .FirstOrDefaultAsync(m => m.ResetId == id);
            if (passwordResets == null)
            {
                return NotFound();
            }

            return View(passwordResets);
        }

        // POST: PasswordResets/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var passwordResets = await _context.PasswordResets.FindAsync(id);
            _context.PasswordResets.Remove(passwordResets);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PasswordResetsExists(int id)
        {
            return _context.PasswordResets.Any(e => e.ResetId == id);
        }
    }
}
