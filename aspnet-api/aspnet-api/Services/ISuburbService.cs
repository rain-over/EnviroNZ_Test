using aspnet_api.Models;

namespace aspnet_api
{
    public interface ISuburbService
    {
        Task<Suburb> GetClosestSuburbFromPoint(double latitude, double longitude);
    }
}
