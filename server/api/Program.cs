using dataAccess;
using Microsoft.EntityFrameworkCore;
using service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddOpenApiDocument();
builder.Services.AddScoped<OrderService>();
builder.Services.AddDbContext<MyDbContext>(Options =>
{
    Options.UseNpgsql(builder.Configuration.GetConnectionString("MyDbConn"));
    
});


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<MyDbContext>();
    dbContext.Database.EnsureCreated();
}


app.MapControllers();
app.UseOpenApi();
app.UseSwaggerUi();

app.UseCors(opts => {
    opts.AllowAnyOrigin();
    opts.AllowAnyMethod();
    opts.AllowAnyHeader();
});


app.Run();