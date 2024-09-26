using dataAccess;
using System.Text.Json.Serialization;
using dataAccess.interfaces;
using dataAccess.Models;
using Microsoft.EntityFrameworkCore;
using service.Services;
using _service;
using _service.Validators;
using dataAccess.Repositories;
using FluentValidation;
using service.Validators;
using api.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers().AddJsonOptions(opt =>
{
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
builder.Services.AddProblemDetails();
builder.Services.AddOpenApiDocument(configure =>
{
    configure.Title = "Lobster paper Shop";
});
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrder, OrderRepository>();
builder.Services.AddScoped<ITrait, TraitRepository>();
builder.Services.AddScoped<ITraitService, TraitService>();
builder.Services.AddScoped<IPaper, PaperRepository>();
builder.Services.AddScoped<IPaperService, PaperService>();

builder.Services.AddValidatorsFromAssemblyContaining<CreatePaperValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdatePaperValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<OrderDtoValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<TraitDtoValidator>();

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

app.UseMiddleware<RequestLoggingMiddleware>();

app.MapControllers();
app.UseOpenApi();
app.UseSwaggerUi();

app.UseCors(opts => {
    opts.AllowAnyOrigin();
    opts.AllowAnyMethod();
    opts.AllowAnyHeader();
});

app.Run();