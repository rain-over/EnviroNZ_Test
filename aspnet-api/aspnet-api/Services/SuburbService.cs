using aspnet_api.Models;
using aspnet_api.Utilities;

namespace aspnet_api
{
    public class SuburbService : ISuburbService
    {
        private readonly IFileReader _fileReader;
        private readonly IDistanceCalculator _distanceCalculator;

        private readonly List<Suburb> _suburbs = new List<Suburb>();

        public SuburbService(IFileReader fileReader, IDistanceCalculator distanceCalculator)
        {
            _fileReader = fileReader;
            _distanceCalculator = distanceCalculator;
            _suburbs = _fileReader.ReadFromFile();
        }

        public async Task<Suburb> GetClosestSuburbFromPoint(double latitude, double longitude)
        {
            if (_suburbs == null || _suburbs.Count == 0)
            {
                throw new Exception("No suburbs found.");
            }

            double minDistance = double.MaxValue;
            Suburb closestSuburb = new Suburb();

            foreach (var suburb in _suburbs)
            {
                double distance = _distanceCalculator.CalculateDistanceByHaversineFormula(suburb.Latitude, suburb.Longitude, latitude, longitude);
                if (distance < minDistance)
                {
                    minDistance = distance;
                    closestSuburb = suburb;
                }
            }

            return await Task.FromResult(closestSuburb);
        }
    }
}
