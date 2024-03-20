using aspnet_api.Models;

namespace aspnet_api
{
    public interface ISuburbService
    {
        Task<List<Suburb>> GetSuburb();

        Task<Suburb> GetSuburb(double latitude, double longitude);
    }
}
