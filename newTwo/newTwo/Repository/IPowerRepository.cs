using newTwo.NewFolder;

namespace newTwo.Repository
{
    public interface IPowerRepository
    {
        Task<int> Craete(Power power);
        Task<int> Update(Power power);
        Task<int> Delete(int powerId);
        Task<Power> GetById(int powerId);

        Task<List<Power>> GetPowers();
        Task<List<Country>> GetCountries();
        Task<List<City>> GetCities(int powerId);

        Task<List<State>> GetStates(int powerId);

    }
}
