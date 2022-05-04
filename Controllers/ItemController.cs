using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace the_third.Controllers
{
    [Route("/api/items")]
    public class ItemsController : ControllerBase
    {
        ApplicationDbContext db;

        public ItemsController(ApplicationDbContext dbContext)
        {
            this.db = dbContext;
        }

        [HttpDelete("{id}")] //api/items/5
        public async Task<IActionResult> RemoveItem(int id)
        {
            var found = await db.Items.FindAsync(id);
            if (found != null)
            {
                db.Items.Remove(found);
                await db.SaveChangesAsync();
                return Ok(new { success = true });
            }
            return NotFound();
        }
    }
}