using Api.Models;
using System.Net;

namespace Api.Data
{
    public interface IPasswordService
    {
        Task<List<Credential>> GetAsync();
        Task<Credential> GetAsync(string id);
        Task CreateAsync(Credential user);
        Task<DbResult> UpdateAsync(string id, Credential updatedUser);
        Task<DbResult> RemoveAsync(string id);
    }
}
