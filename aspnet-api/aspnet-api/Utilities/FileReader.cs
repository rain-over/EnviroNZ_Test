using aspnet_api.Models;
using System.Text.Json;

namespace aspnet_api.Utilities
{
    public class FileReader : IFileReader
    {
        private readonly string _filePath;

        private readonly JsonSerializerOptions _options = new()
        {
            PropertyNameCaseInsensitive = true
        };

        public FileReader()
        {
            _filePath = "Data/suburbs.json";
        }

        public List<Suburb> ReadFromFile()
        {
            try
            {
                using FileStream json = File.OpenRead(_filePath);

                var deserializedSuburbs = JsonSerializer.Deserialize<List<Suburb>>(json, _options);

                return deserializedSuburbs ?? new List<Suburb>();
            }
            catch (Exception ex)
            {
                throw new Exception("Error loading suburbs from file.", ex);
            }
        }
    }
}
