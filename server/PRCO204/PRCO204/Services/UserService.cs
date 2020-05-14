using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using PRCO204.Models;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using AutoMapper;


namespace PRCO204.Services
{
    public interface IUserService
    {
        Users Authenticate(string email, string password);
        IEnumerable<Users> GetAll();
        Users GetById(int id);
    }
    public class UserService : IUserService
    {
        private readonly PRCO204.Models.maindbContext _context;


        public UserService(maindbContext context)
        {
            _context = context;
        }

        public Users Authenticate(string email, string password)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == email  && x.Password == password);

            if (user == null)
                return null;

            

            return user;
        }

        public Users GetById(int id)
        {
            return _context.Users.Find(id);
        }
        public IEnumerable<Users> GetAll()
        {
            return _context.Users;
        }
    }
}
