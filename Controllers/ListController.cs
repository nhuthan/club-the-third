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

        [HttpGet("sql")]
        public IActionResult GetSql()
        {
            var query = db.Lists
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
                }).ToQueryString();

            // var list = await db.Lists.FromSqlRaw(@"
            //     SELECT l.""Id"", l.""Name"", i.""Id"", i.""ListId"", i.""Title"", i.""IsCompleted"", i.""IsImportant""
            //     FROM ""Lists"" AS l
            //     LEFT JOIN ""Items"" AS i ON l.""Id"" = i.""ListId""
            //     ORDER BY l.\Id"", i.""Id""
            // ").ToListAsync();

            return Ok(query);
        }
    }
}