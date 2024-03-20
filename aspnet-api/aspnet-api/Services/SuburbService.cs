using aspnet_api.Models;

namespace aspnet_api
{
    public class SuburbService : ISuburbService
    {
        private readonly List<Suburb> suburbs;
        public SuburbService()
        {
            suburbs = new List<Suburb>
            {
                new Suburb { Id = 1, SuburbName = "Arch Hill", Latitude = -36.8659669, Longitude = 174.7148012 },
                new Suburb { Id = 2, SuburbName = "Auckland CBD", Latitude = -36.859454, Longitude = 174.5660387 },
                new Suburb { Id = 3, SuburbName = "Avondale", Latitude = -36.8852381, Longitude = 174.6649163 },
                new Suburb { Id = 4, SuburbName = "Balmoral", Latitude = -36.8976578, Longitude = 174.7250972 },
                new Suburb { Id = 5, SuburbName = "Birkenhead", Latitude = -36.8120427, Longitude = 174.7260381 }
            };
        }
        public async Task<List<Suburb>> GetSuburb()
        {
            //retrieve from file/db: static for now
            return suburbs;
        }

        public async Task<Suburb> GetSuburb(double latitude, double longitude)
        {
            //temp
            return suburbs.First();
        }
    }
}
