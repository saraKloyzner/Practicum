using Practicum.API.Mapping;
using Practicum.Core;
using Practicum.Core.Mapping;
//using Practicum.Core.Mapping;
using Practicum.Core.Repositories;
using Practicum.Core.Services;
using Practicum.Data;
using Practicum.Data.Repositories;
using Practicum.Service;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(option=>
{
    option.JsonSerializerOptions.ReferenceHandler =ReferenceHandler.IgnoreCycles;
    option.JsonSerializerOptions.WriteIndented = true;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IEmployeeServiece, EmployeeService>();
builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
builder.Services.AddScoped<IRoleNameServiece,RoleNameService >();
builder.Services.AddScoped<IRoleNameRepository, RoleNameRepository>();


//builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddAutoMapper(typeof(MappingProfile),typeof(PostModelMappingProfile));

builder.Services.AddDbContext<DataContext>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();


