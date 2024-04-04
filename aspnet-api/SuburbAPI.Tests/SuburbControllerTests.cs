using aspnet_api;
using aspnet_api.Controllers;
using aspnet_api.Models;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace SuburbAPI.Tests
{
    public class SuburbControllerTests
    {

        [Test]
        public async Task GetClosestSuburb_Returns_Exception()
        {
            var mockSuburbService = new Mock<ISuburbService>();
            var controller = new SuburbController(mockSuburbService.Object);
            mockSuburbService.Setup(service => service.GetClosestSuburbFromPoint(It.IsAny<double>(), It.IsAny<double>()))
                             .ThrowsAsync(new Exception("No suburbs found!"));

            await controller.Invoking(async x => await x.GetClosestSuburb(latitude: 1.0, longitude: 1.0)).Should().ThrowAsync<Exception>()
               .WithMessage("No suburbs found!");
        }

        [Test]
        public async Task GetClosestSuburb_Returns_OkResult()
        {
            var mockSuburbService = new Mock<ISuburbService>();
            var controller = new SuburbController(mockSuburbService.Object);
            var expectedSuburb = new Suburb { Id = 2, SuburbName = "Auckland CBD", Latitude = -36.8485, Longitude = 174.7633 };
            mockSuburbService.Setup(service => service.GetClosestSuburbFromPoint(It.IsAny<double>(), It.IsAny<double>()))
                             .ReturnsAsync(expectedSuburb);

            var result = await controller.GetClosestSuburb(latitude: 100, longitude: 100) as OkObjectResult;

            result.Should().NotBeNull();
            result.Should().BeOfType<OkObjectResult>();
            result.Value.Should().BeEquivalentTo(expectedSuburb);
        }
    }
}
