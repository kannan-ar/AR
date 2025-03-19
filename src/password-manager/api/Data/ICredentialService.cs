using Api.Models;
using Api.ViewModels;

namespace Api.Data
{
    public interface ICredentialService
    {
        IAsyncEnumerable<CredentialVM> GetAsync();
        Task<CredentialVM> GetAsync(string id);
        Task CreateAsync(CreateUpdateCredentialVM vm);
        Task<DbResult> UpdateAsync(string id, CreateUpdateCredentialVM vm);
        Task<DbResult> RemoveAsync(string id);
    }
}
