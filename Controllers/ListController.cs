using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace the_third.Controllers
{
    [Route("/api/lists")]
    public class ListsController : ControllerBase
    {
        ApplicationDbContext db;

        public ListsController(ApplicationDbContext dbContext)
        {
            this.db = dbContext;
        }

        public async Task<IActionResult> GetList()
        {
            var list = await db.Lists
                .Select(list => new
                {
                    list.Id,
                    list.Name,
                    Items = list.Items.Select(item => new
                    {
                        item.Id,
                        item.ListId,
                        item.Title,
                        item.IsCompleted,
                        item.IsImportant
                    })
                }).ToListAsync();
            return Ok(list);
        }
    }
}