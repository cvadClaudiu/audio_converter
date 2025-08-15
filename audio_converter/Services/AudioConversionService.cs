using audio_converter.Infrastructure;
using FFMpegCore;
using System.Diagnostics;

namespace audio_converter.Services
{
    public class AudioConversionService
    {
        private readonly string _ffmpegPath;

        public AudioConversionService(IConfiguration configuration)
        {
            _ffmpegPath = configuration["FfmpegPath"] ?? "ffmpeg";
        }

        public async Task<string> ConvertAudioFileAsync(string inputPath, AudioFormat outputFormat, string outputFolder)
        {
            Directory.CreateDirectory(outputFolder);
            string outputFileName = $"converted.{outputFormat.ToString().ToLower()}";
            string outputPath = Path.Combine(outputFolder, outputFileName);

            string codecArgs = outputFormat.ToCodecArgs();

            var arguments = $"-y -i \"{inputPath}\" {codecArgs} \"{outputPath}\"";

            var processStartInfo = new ProcessStartInfo
            {
                FileName = _ffmpegPath,
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process { StartInfo = processStartInfo };
            process.Start();

            string stderr = await process.StandardError.ReadToEndAsync();
            await process.WaitForExitAsync();

            if (process.ExitCode != 0)
            {
                throw new Exception($"FFmpeg failed: {stderr}");
            }

            return outputPath;
        }
    }
}
