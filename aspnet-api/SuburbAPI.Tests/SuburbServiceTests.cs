using aspnet_api;
using aspnet_api.Models;
using aspnet_api.Utilities;
using FluentAssertions;
using Moq;

namespace SuburbAPI.Tests
{
    public class SuburbServiceTests
    {

        private static List<Suburb> GetTestSuburbs()
        {
            return new List<Suburb> {
                new()  {Id = 1, SuburbName = "Arch Hill", Latitude = -36.8624, Longitude = 174.7372 },
                new() { Id = 2, SuburbName = "Auckland CBD", Latitude = -36.8485, Longitude = 174.7633 },
                new()  {Id = 3, SuburbName = "Avondale", Latitude = -36.8972, Longitude = 174.7008 },
            };
        }
        private static Double GetTestDistance(double x1, double y1, double x2, double y2)
        {
            return Math.Sqrt(Math.Pow((x2 - x1), 2) + Math.Pow((y2 - y1), 2));
        }

        [Test]
        public void GetClosestSuburbFromPoint_Throws_Exception_If_No_Suburbs()
        {
            var mockFileReader = new Mock<IFileReader>();
            var mockDistanceCalculator = new Mock<IDistanceCalculator>();
            var service = new SuburbService(mockFileReader.Object, mockDistanceCalculator.Object);

            mockFileReader.Setup(fr => fr.ReadFromFile()).Returns(new List<Suburb>());

            service.Invoking(async x => await x.GetClosestSuburbFromPoint(latitude: 1.0, longitude: 1.0)).Should().ThrowAsync<Exception>()
                .WithMessage("No suburbs found.");
        }

        [Test]
        public async Task GetClosestSuburbFromPoint_Returns_Closest_Suburb()
        {
            var mockFileReader = new Mock<IFileReader>();
            var mockDistanceCalculator = new Mock<IDistanceCalculator>();
            var testSuburbs = GetTestSuburbs();

            mockFileReader.Setup(fr => fr.ReadFromFile()).Returns(testSuburbs);
            mockDistanceCalculator.Setup(dc => dc.CalculateDistanceByHaversineFormula(It.IsAny<double>(), It.IsAny<double>(), It.IsAny<double>(), It.IsAny<double>()))
                                  .Returns<double, double, double, double>((x1, y1, x2, y2) => GetTestDistance(x1, y1, x2, y2));
            var service = new SuburbService(mockFileReader.Object, mockDistanceCalculator.Object);

            var closestSuburb = await service.GetClosestSuburbFromPoint(latitude: 100, longitude: 100);

            closestSuburb.Should().NotBeNull();
            closestSuburb.SuburbName.Should().Be("Arch Hill");
        }
    }
}
