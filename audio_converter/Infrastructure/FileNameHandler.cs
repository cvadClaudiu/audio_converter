namespace audio_converter.Infrastructure
{
    public class FileNameHandler
    {
        public static string convertedFilename(AudioFormat format, string originalFileName)
        {
            string originalName = Path.GetFileNameWithoutExtension(originalFileName);
            return $"converted_to_{format.ToString().ToLower()}_{originalName}.{format.ToString().ToLower()}";
        }   

    public static void SetDownloadHeader(HttpResponse response, string fileName)
        {
            var contentDisposition = new System.Net.Mime.ContentDisposition
            {
                FileName = fileName,
                Inline = false
            };
            response.Headers["Content-Disposition"] = contentDisposition.ToString();
        }
    } 
}
