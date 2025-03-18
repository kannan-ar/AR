using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Api.Models
{
    public class Credential
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("UserName")]
        public string UserName { get; set; } = string.Empty;

        [BsonElement("Password")]
        public string Password { get; set; } = string.Empty;
    }
}
