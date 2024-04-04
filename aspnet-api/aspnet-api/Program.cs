using aspnet_api;
using aspnet_api.Utilities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddScoped<ISuburbService, SuburbService>();
builder.Services.AddScoped<IFileReader, FileReader>();
builder.Services.AddScoped<IDistanceCalculator, DistanceCalculator>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(x => x.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
