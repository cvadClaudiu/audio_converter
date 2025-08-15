using audio_converter.Infrastructure;

namespace audio_converter.Infrastructure
{
    public enum AudioFormat
    {
        Wav,
        Mp3,
        Aac,
        Flac,
        Ogg,
        Wma
    }


    public static class AudioFormatExtensions
    {
        public static string ToContentType(this AudioFormat format)
        {
            return format switch
            {
                AudioFormat.Mp3 => "audio/mpeg",
                AudioFormat.Aac => "audio/aac",
                AudioFormat.Flac => "audio/flac",
                AudioFormat.Ogg => "audio/ogg",
                AudioFormat.Wma => "audio/x-ms-wma",
                AudioFormat.Wav => "audio/wav",
                _ => "application/octet-stream"
            };
        }

        public static string ToCodecArgs(this AudioFormat format)
        {
            return format switch
            {
                AudioFormat.Mp3 => "-codec:a libmp3lame -qscale:a 2",
                AudioFormat.Aac => "-codec:a aac -b:a 192k",
                AudioFormat.Flac => "-codec:a flac",
                AudioFormat.Ogg => "-codec:a libvorbis -qscale:a 5",
                AudioFormat.Wma => "-codec:a wmav2 -b:a 192k",
                AudioFormat.Wav => "-codec:a pcm_s16le",
                _ => throw new ArgumentOutOfRangeException(nameof(format), "Unsupported format")
            };
        }
    }
}