using Microsoft.AspNetCore.Mvc;
using UglyToad.PdfPig;
using DocumentFormat.OpenXml.Packaging;
using System.Text;
using Flurl.Http;

namespace ResumeAI.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    private readonly IConfiguration _config;

    // 🔹 Inject IConfiguration
    public ResumeController(IConfiguration config)
    {
        _config = config;
    }

    [HttpPost("analyze")]
    public async Task<IActionResult> Analyze(IFormFile file)
    {
        if (file == null)
            return BadRequest("No file uploaded.");

        // 🔹 Read API key from configuration (User Secrets)
        var apiKey = _config["OpenAI:ApiKey"];

        if (string.IsNullOrWhiteSpace(apiKey))
            return BadRequest("OpenAI API key NOT FOUND");

        string extractedText = ExtractText(file);
        if (string.IsNullOrWhiteSpace(extractedText))
            return BadRequest("Could not extract text");

        string prompt = BuildPrompt(extractedText);

        try
        {
            var response = await "https://api.openai.com/v1/chat/completions"
                .WithHeader("Authorization", $"Bearer {apiKey}")
                .WithHeader("Content-Type", "application/json")
                .PostJsonAsync(new
                {
                    model = "gpt-4o-mini",
                    messages = new[]
                    {
                        new { role = "user", content = prompt }
                    }
                })
                .ReceiveJson<dynamic>();

            return Ok(response);
        }
        catch (FlurlHttpException ex)
        {
            // 🔴 Helpful error output instead of 500
            var error = await ex.GetResponseStringAsync();
            return StatusCode(500, error);
        }
    }

    private string ExtractText(IFormFile file)
    {
        var ext = Path.GetExtension(file.FileName).ToLower();

        if (ext == ".pdf")
        {
            using var pdf = PdfDocument.Open(file.OpenReadStream());
            var sb = new StringBuilder();
            foreach (var page in pdf.GetPages())
                sb.AppendLine(page.Text);
            return sb.ToString();
        }

        if (ext == ".docx")
        {
            using var doc = WordprocessingDocument.Open(file.OpenReadStream(), false);
            return doc.MainDocumentPart!.Document.Body!.InnerText;
        }

        using var reader = new StreamReader(file.OpenReadStream());
        return reader.ReadToEnd();
    }

    private string BuildPrompt(string text)
    {
        return @$"
You are an AI Resume Expert.

Rewrite the following resume to be more professional and impactful.

Provide:
1. Improved Resume
2. About Me summary
3. Suggested job roles
4. Resume score (0–100) with short explanation

Resume:
{text}
";
    }
}

