using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace the_third.Controllers
{
    [Route("/home")]
    public class HomeController : ControllerBase
    {
        ApplicationDbContext db;
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public HomeController(ApplicationDbContext dbContext, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            this.db = dbContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        [HttpGet("createUser")]
        public async Task<IActionResult> CreateUser(string username, string password)
        {
            var result = await userManager.CreateAsync(new IdentityUser
            {
                UserName = username,
                Email = username + "@gmail.com"
            }, password);

            if (result.Succeeded)
            {
                return Ok("Tạo tài khoản thành công");
            }
            return BadRequest(result.Errors);
        }
    }
}