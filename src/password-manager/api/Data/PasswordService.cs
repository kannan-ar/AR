using Api.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Net;

namespace Api.Data
{
    public class PasswordService : IPasswordService
    {
        private readonly IMongoCollection<Credential> _credentials;

        public PasswordService(IOptions<MongoDbSettings> options)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            _credentials = database.GetCollection<Credential>(options.Value.CollectionName);
        }

        public async Task<List<Credential>> GetAsync() =>
            await _credentials.Find(credential => true).ToListAsync();

        public async Task<Credential> GetAsync(string id) =>
           await _credentials.Find(user => user.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Credential user) =>
            await _credentials.InsertOneAsync(user);

        public async Task<DbResult> UpdateAsync(string id, Credential updatedUser)
        {
            updatedUser.Id = id;

            var result = await _credentials.ReplaceOneAsync(user => user.Id == id, updatedUser);
            return result.ModifiedCount == 0 ? DbResult.NotFound : DbResult.OK;
        }
            

        public async Task<DbResult> RemoveAsync(string id)
        {
            var result = await _credentials.DeleteOneAsync(user => user.Id == id);
            return result.DeletedCount == 0 ? DbResult.NotFound : DbResult.OK;
        }
            
    }
}
