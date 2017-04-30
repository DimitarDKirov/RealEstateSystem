namespace Teleimot.Data.Migrations
{
    using Common.Constants;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using Models;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public sealed class Configuration : DbMigrationsConfiguration<TeleimotDbContext>
    {
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true;
            this.AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(TeleimotDbContext context)
        {
            const string AdministratorEmail = "admin@realestate.com";
            const string AdministratorUserName = "admin";
            const string AdministratorPassword = "admin";

            if (!context.Roles.Any())
            {
                // Create admin role
                var roleStore = new RoleStore<IdentityRole>(context);
                var roleManager = new RoleManager<IdentityRole>(roleStore);
                var role = new IdentityRole { Name = UserConstants.AdminRoleName };
                roleManager.Create(role);

                // Create admin user
                var userStore = new UserStore<User>(context);
                var userManager = new UserManager<User>(userStore);
                userManager.PasswordValidator = new PasswordValidator() { RequiredLength = 5 };
                var user = new User { UserName = AdministratorUserName, Email = AdministratorEmail };
                var result = userManager.Create(user, AdministratorPassword);

                // Assign user to admin role
                userManager.AddToRole(user.Id, UserConstants.AdminRoleName);
            }
        }
    }
}
