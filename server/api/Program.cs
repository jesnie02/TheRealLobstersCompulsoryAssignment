using dataAccess;
using dataAccess.interfaces;
using dataAccess.Models;
using Microsoft.EntityFrameworkCore;
using service.Services;
using _service;
using _service.Validators;
using FluentValidation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddOpenApiDocument(configure =>
{
    configure.Title = "Lobster paper Shop";
});
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<TraitService>();
builder.Services.AddScoped<IPaper, PaperRepository>();
builder.Services.AddScoped<IPaperService, PaperService>();

builder.Services.AddValidatorsFromAssemblyContaining<CreatePaperValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdatePaperValidator>();

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