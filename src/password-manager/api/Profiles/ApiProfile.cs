using Api.Models;
using Api.ViewModels;
using AutoMapper;

namespace Api.Profiles
{
    public class ApiProfile : Profile
    {
        public ApiProfile()
        {
            CreateMap<CredentialVM, Credential>().ReverseMap();
            CreateMap<CreateUpdateCredentialVM, Credential>().ReverseMap();
        }
    }
}
