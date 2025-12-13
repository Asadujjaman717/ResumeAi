

var builder = WebApplication.CreateBuilder(args);

// Load User Secrets for OpenAI API Key
builder.Configuration.AddUserSecrets<Program>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Enable CORS for React frontend
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowReactDev",
//        policy => policy
//            .WithOrigins("http://localhost:5173") // React dev server
//            .AllowAnyHeader()
//            .AllowAnyMethod());
//});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactDev",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});


var app = builder.Build();
app.UseCors("AllowReactDev"); // before MapControllers


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection(); // Optional, can be removed for HTTP-only

// ✅ Use CORS
//app.UseCors("AllowReactDev");

app.UseAuthorization();
app.MapControllers();
app.Run();
