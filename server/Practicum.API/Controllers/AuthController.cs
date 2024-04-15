using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Practicum.API.Models;
using Practicum.Core.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Practicum.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserServiece _userService;
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration,IUserServiece userServiece)
        {
            _configuration = configuration;
            _userService = userServiece;
        }

        [HttpPost]
        public IActionResult Login([FromBody] LoginModel loginModel)
        {
            var employee= _userService.GetByUserNameAndPassword(loginModel.UserName,loginModel.Password);
            if (employee is not null)
            {
                var claims = new List<Claim>()
            {
                new Claim("Id",employee.Id.ToString()),
                new Claim("Name",employee.Name),
              
            };

                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: _configuration.GetValue<string>("JWT:Issuer"),
                    audience: _configuration.GetValue<string>("JWT:Audience"),
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(6),
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(new { Token = tokenString });
            }
            return Unauthorized();
        }
       
        [HttpGet("verifyToken")]
        public IActionResult VerifyToken()
        {
            var tokenString = HttpContext.Request.Headers["Authorization"].ToString().Split(" ")[1]; // Assuming the token is sent in the "Authorization" header
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key"));
            
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _configuration.GetValue<string>("JWT:Issuer"),
                ValidateAudience = true,
                ValidAudience = _configuration.GetValue<string>("JWT:Audience"),
                ValidateLifetime = true
            };

            try
            {
                tokenHandler.ValidateToken(tokenString, tokenValidationParameters, out SecurityToken validatedToken);
                return Ok(true); // Respond with true indicating the token is valid
            }
            catch
            {
                return Ok(false); // Respond with false indicating the token is invalid
            }
        }
    }
}


