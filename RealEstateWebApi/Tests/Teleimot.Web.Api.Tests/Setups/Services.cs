namespace Teleimot.Web.Api.Tests.Setups
{
    using Teleimot.Services.Data;
    using Teleimot.Services.Data.Contracts;

    public static class Services
    {
        public static ICommentsService CommentsService
        {
            get
            {
                return new CommentsService(Repositories.CommentsRepository, Repositories.RealEstatessRepository);
            }
        }
    }
}
