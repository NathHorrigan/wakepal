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
    public class DailyFitnessesController : Controller
    {
        private readonly maindbContext _context;

        public DailyFitnessesController(maindbContext context)
        {
            _context = context;
        }

        // GET: DailyFitnesses
        public async Task<IActionResult> Index()
        {
            var maindbContext = _context.DailyFitness.Include(d => d.User);
            return View(await maindbContext.ToListAsync());
        }

        // GET: DailyFitnesses/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dailyFitness = await _context.DailyFitness
                .Include(d => d.User)
                .FirstOrDefaultAsync(m => m.FitnessId == id);
            if (dailyFitness == null)
            {
                return NotFound();
            }

            return View(dailyFitness);
        }

        // GET: DailyFitnesses/Create
        public IActionResult Create()
        {
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email");
            return View();
        }

        // POST: DailyFitnesses/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("FitnessId,UserId,FitnessDate,Weight,Steps,Water,Calories,Floors")] DailyFitness dailyFitness)
        {
            if (ModelState.IsValid)
            {
                _context.Add(dailyFitness);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", dailyFitness.UserId);
            return View(dailyFitness);
        }

        // GET: DailyFitnesses/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dailyFitness = await _context.DailyFitness.FindAsync(id);
            if (dailyFitness == null)
            {
                return NotFound();
            }
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", dailyFitness.UserId);
            return View(dailyFitness);
        }

        // POST: DailyFitnesses/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("FitnessId,UserId,FitnessDate,Weight,Steps,Water,Calories,Floors")] DailyFitness dailyFitness)
        {
            if (id != dailyFitness.FitnessId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(dailyFitness);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DailyFitnessExists(dailyFitness.FitnessId))
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
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "Email", dailyFitness.UserId);
            return View(dailyFitness);
        }

        // GET: DailyFitnesses/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var dailyFitness = await _context.DailyFitness
                .Include(d => d.User)
                .FirstOrDefaultAsync(m => m.FitnessId == id);
            if (dailyFitness == null)
            {
                return NotFound();
            }

            return View(dailyFitness);
        }

        // POST: DailyFitnesses/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var dailyFitness = await _context.DailyFitness.FindAsync(id);
            _context.DailyFitness.Remove(dailyFitness);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool DailyFitnessExists(int id)
        {
            return _context.DailyFitness.Any(e => e.FitnessId == id);
        }
    }
}
