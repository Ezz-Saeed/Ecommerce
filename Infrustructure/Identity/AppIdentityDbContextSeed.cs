using Core.Enitities.IdentityEntities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrustructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName="User",
                    Email="user@test.com",
                    UserName= "user@test.com",
                    Address = new Address
                    {
                        FirstName="User",
                        LastName="User",
                        Street="10 th street",
                        State="Egypt",
                        City="cairo",
                        ZipCode="12345",
                    }
                };

                await userManager.CreateAsync(user,"Ab$$1234");
            }
        }
    }
}
