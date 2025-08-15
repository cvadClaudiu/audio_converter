using audio_converter.Infrastructure;
using audio_converter.Services;
using FFMpegCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml;

namespace audio_converter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConversionController : ControllerBase
    {
        private readonly AudioConversionService _audioService;
        private readonly IWebHostEnvironment _env;

        public ConversionController(AudioConversionService audioService, IWebHostEnvironment env)
        {
            _audioService = audioService;
            _env = env;
        }

        [HttpPost("convert")]
        public async Task<IActionResult> ConvertAudioFile(IFormFile file, [FromQuery] string format = "mp3")
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var inputExt = Path.GetExtension(file.FileName);
            string tempInput = Path.Combine(_env.ContentRootPath, "temp_input.wav");


            string saveFolder = @"C:\AIA\0Proiecte\RE_converter\converted";
            Directory.CreateDirectory(saveFolder);

            string tempOutput = Path.Combine(saveFolder, "converted.mp3");

            using (var stream = new FileStream(tempInput, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            if (!Enum.TryParse<AudioFormat>(format, true, out var audioFormat))
            {
                return BadRequest("Invalid output format specified.");
            }

            string outputFilePath = await _audioService.ConvertAudioFileAsync(tempInput, audioFormat, saveFolder);

            var bytes = await System.IO.File.ReadAllBytesAsync(outputFilePath);
            string rootFilePath = Path.Combine(_env.ContentRootPath, "converted." + format.ToString().ToLower());
            if (System.IO.File.Exists(rootFilePath))
            {
                System.IO.File.Delete(rootFilePath);
            }

            string contentType = audioFormat.ToContentType();

            string fileName = FileNameHandler.convertedFilename(audioFormat, file.FileName);
            FileNameHandler.SetDownloadHeader(Response, fileName);
            return File(bytes, contentType);
        }
    }
}
