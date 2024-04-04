using aspnet_api.Models;

namespace aspnet_api.Utilities
{
    public interface IFileReader
    {
        List<Suburb> ReadFromFile();
    }
}
