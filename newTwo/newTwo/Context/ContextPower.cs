using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace newTwo.Context
{
    public class ContextPower
    {
        private readonly IConfiguration _configuration;
        private readonly string _connection;
        public ContextPower(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = _configuration.GetConnectionString("PowerConnection");
        }
        public IDbConnection CreateConnection()=>new SqlConnection(_connection);
    }
}
