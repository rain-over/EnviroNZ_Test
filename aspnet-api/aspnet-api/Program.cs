var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(x => x.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
