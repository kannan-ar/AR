using Api.Extensions;
using Api.Models;
using Api.ViewModels;
using AutoMapper;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Api.Data
{
    public class CredentialService : ICredentialService
    {
        private readonly IMongoCollection<Credential> _credentials;
        private readonly ConfigSettings _settings;
        private readonly IMapper _mapper;

        public CredentialService(
            IOptions<MongoDbSettings> options,
            IOptions<ConfigSettings> settings,
            IMapper mapper)
        {
            var client = new MongoClient(options.Value.ConnectionString);
            var database = client.GetDatabase(options.Value.DatabaseName);
            _credentials = database.GetCollection<Credential>(options.Value.CollectionName);
            _settings = settings.Value;
            _mapper = mapper;
        }

        public async IAsyncEnumerable<CredentialVM> GetAsync()
        {
            var credentials = await _credentials.Find(credential => true).ToListAsync();

            foreach (var credential in credentials)
            {
                var vm = _mapper.Map<CredentialVM>(credential);

                vm.Password = credential.Password.Decrypt(_settings.CryptoPassword, credential.Salt);

                yield return vm;
            }
        }

        public async Task<CredentialVM> GetAsync(string id)
        {
            var credential = await _credentials.Find(user => user.Id == id).FirstOrDefaultAsync();

            var vm = _mapper.Map<CredentialVM>(credential);

            vm.Password = credential.Password.Decrypt(_settings.CryptoPassword, credential.Salt);

            return vm;
        }

        public async Task CreateAsync(CreateUpdateCredentialVM vm)
        {
            var credential = _mapper.Map<Credential>(vm);

            credential.Password = vm.Password.Encrypt(_settings.CryptoPassword, out var salt);
            credential.Salt = salt;

            await _credentials.InsertOneAsync(credential);
        }

        public async Task<DbResult> UpdateAsync(string id, CreateUpdateCredentialVM vm)
        {
            var credential = _mapper.Map<Credential>(vm);

            credential.Id = id;
            credential.Password = vm.Password.Encrypt(_settings.CryptoPassword, out var salt);
            credential.Salt = salt;

            var result = await _credentials.ReplaceOneAsync(x => x.Id == id, credential);

            return result.ModifiedCount == 0 ? DbResult.NotFound : DbResult.OK;
        }

        public async Task<DbResult> RemoveAsync(string id)
        {
            var result = await _credentials.DeleteOneAsync(x => x.Id == id);
            return result.DeletedCount == 0 ? DbResult.NotFound : DbResult.OK;
        }
    }
}
