using dataAccess;
using dataAccess.interfaces;
using dataAccess.Models;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using _service;
using _service.Validators;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddProblemDetails();
builder.Services.AddOpenApiDocument();
builder.Services.AddDbContext<MyDbContext>(Options =>
{
    Options.UseNpgsql(builder.Configuration.GetConnectionString("MyDbConn"));
});
builder.Services.AddFluentValidation(fv => 
{
    fv.RegisterValidatorsFromAssemblyContaining<CreatePaperValidator>();
    fv.RegisterValidatorsFromAssemblyContaining<UpdatePaperValidator>();
});
builder.Services.AddScoped<IPaper, PaperRepository>();
builder.Services.AddScoped<IPaperService, PaperService>();

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