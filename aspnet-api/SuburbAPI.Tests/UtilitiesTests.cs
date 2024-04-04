using aspnet_api.Models;
using aspnet_api.Utilities;
using FluentAssertions;

namespace SuburbAPI.Tests
{
    public class DistanceCalculatorTests
    {
        [Test]
        public void CalculateDistanceByHaversineFormula_ShouldReturnCorrectDistance()
        {
            var distanceCalculator = new DistanceCalculator();
            double x1 = -36.8508; // Auckland CBD 
            double y1 = 174.7645;
            double x2 = -41.2842; // Wellington CBD
            double y2 = 174.7775;

            var distance = distanceCalculator.CalculateDistanceByHaversineFormula(x1, y1, x2, y2);

            distance.Should().BeApproximately(493, 0.1);
        }
    }

    public class FileReaderTests
    {
        [Test]
        public void ReadFromFile_Success()
        {
            var fileReader = new FileReader();
            var expectedPattern = new Suburb { Id = 2, SuburbName = "Auckland CBD", Latitude = -36.8485, Longitude = 174.7633 };

            var actualSuburbs = fileReader.ReadFromFile();

            actualSuburbs.Should().NotBeNull();
            actualSuburbs.Find(x => x.Id == 2).Should().BeEquivalentTo(expectedPattern, options => options.ExcludingMissingMembers());
        }
    }
}