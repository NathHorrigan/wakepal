using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using System.IdentityModel.Tokens;
using PRCO204.Entities;
using PRCO204.Helpers;
using System.Text;
using Microsoft.Extensions.Options;
using System.Security.Claims;



namespace PRCO204.Services
{
    public interface IUserService
    {
        User Authenticate(string email, string password);
        IEnumerable<User> GetAll();
    }
    public class UserService : IUserService
    {
        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        private List<User> _users = new List<User>
        {
            new User { UserId = 1, FirstName = "Test", LastName = "User", Email = "test", Password = "test" }
        };

        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public User Authenticate(string email, string password)
        {
            var user = _users.SingleOrDefault(x => x.Email== email  && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _users;
        }
    }
}
