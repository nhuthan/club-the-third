using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace the_third.Controllers
{
    [Route("/user")]
    public class UserController : ControllerBase
    {
        ApplicationDbContext db;
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public UserController(ApplicationDbContext dbContext, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            this.db = dbContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.signInManager = signInManager;
        }

        [HttpGet("info")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetInfo()
        {
            var userName = User.Identity.Name;
            //var user = await userManager.FindByNameAsync(userName);

            var user2 = await db.Users.Select(u => new
            {
                u.FullName,
                u.Description,
                u.Avatar,
                u.UserName,
                u.Email,
                u.PhoneNumber
            }).Where(u => u.UserName == userName)
            .FirstOrDefaultAsync();

            // return Ok(new
            // {
            //     User = new
            //     {
            //         user.UserName,
            //         user.Email,
            //         user.PhoneNumber
            //     }
            // });

            return Ok(user2);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);
            string error = null;
            if (user != null)
            {
                if (!await signInManager.CanSignInAsync(user))
                {
                    error = "Kh??ng ???????c ph??p ????ng nh???p";
                }
                else if (userManager.SupportsUserLockout && await userManager.IsLockedOutAsync(user))
                {
                    error = "T??i kho???n ??ang b??? kh??a";
                }
                else
                {
                    if (await userManager.CheckPasswordAsync(user, model.Password))
                    {
                        if (userManager.SupportsUserLockout)
                        {
                            await userManager.ResetAccessFailedCountAsync(user);
                        }
                    }
                    else
                    {
                        await userManager.AccessFailedAsync(user);
                        error = "T??i kho???n ho???c m???t kh???u kh??ng ????ng";
                    }
                }
            }
            else
            {
                error = "T??i kho???n ho???c m???t kh???u kh??ng ????ng";
            }

            if (error != null)
            {
                return BadRequest(new
                {
                    Error = "????ng nh???p th???t b???i",
                    Message = error
                });
            }

            var now = DateTime.UtcNow;
            var userId = user.Id;
            var expires = model.Remember ? now.Add(TimeSpan.FromDays(10)) : now.Add(TimeSpan.FromDays(1));

            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier,  userId.ToString()),
                new Claim(ClaimTypes.Name,  user.UserName),
                new Claim("AspNet.Identity.SecurityStamp",  user.SecurityStamp)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Startup.SecurityKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create the JWT and write it to a string
            var jwt = new JwtSecurityToken(
                issuer: "RS",
                audience: "RS",
                claims: claims,
                notBefore: now,
                expires: expires,
                signingCredentials: creds
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Ok(new
            {
                AccessToken = encodedJwt,
                ExpiresIn = expires,
                User = new
                {
                    user.UserName,
                    user.Email,
                    user.PhoneNumber
                }
            });
        }
    }

    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public bool Remember { get; set; }
    }
}