using Dapper;
using newTwo.Context;
using newTwo.NewFolder;

namespace newTwo.Repository
{
    public class PowerRepository : IPowerRepository
    {
        private readonly ContextPower _Context;
        public PowerRepository(ContextPower Context)
        {
            _Context = Context;
        }

        public async Task<int> Craete(Power power)
        {
            using (var connection = _Context.CreateConnection())
            {
                var powerInsert = await connection.ExecuteAsync("dbo.P_Power_Inesrt", new
                {
                    PowerName = power.PowerName,
                    CountryId = power.CountryId,
                    StateId = power.StateId,
                    CityId = power.CityId,
                    Gender = power.Gender,
                    DOB = power.DOB,
                    PanNo = power.PanNo


                }, commandType: System.Data.CommandType.StoredProcedure);

                if (powerInsert > 0)
                {
                    return 1;
                }

                return 0;
            }
        }

        public async Task<int> Delete(int powerId)
        {
            using (var connection = _Context.CreateConnection())
            {
                var DeletePower = await connection.ExecuteAsync("dbo.P_Power_Delete", new { PoewrId = powerId }, commandType: System.Data.CommandType.StoredProcedure);

                if (DeletePower > 0)
                {
                    return 1;
                }
                return 0;
            }
        }

        public async Task<Power> GetById(int powerId)
        {
            using (var connection = _Context.CreateConnection())
            {
                return await connection.QueryFirstAsync<Power>("dbo.P_Power_ById", new { PowerId = powerId }, commandType: System.Data.CommandType.StoredProcedure);


            }

            return new Power();
        }
        public async Task<List<Country>> GetCountries()
        {
            using (var connection = _Context.CreateConnection())
            {
                var data = await connection.QueryMultipleAsync("dbo.P_CountryAll", commandType: System.Data.CommandType.StoredProcedure);

                return data.Read<Country>().ToList();


            }

            return null;
        }
        public async Task<List<State>> GetStates(int id)
        {
            using (var connection = _Context.CreateConnection())
            {
                var data = await connection.QueryMultipleAsync("dbo.P_StateAll", new { CountryId = id }, commandType: System.Data.CommandType.StoredProcedure);

                return data.Read<State>().ToList();


            }

            return null;
        }
        public async Task<List<City>> GetCities(int id)
        {
            using (var connection = _Context.CreateConnection())
            {
                var data = await connection.QueryMultipleAsync("dbo.P_CityAll", new { StateId = id }, commandType: System.Data.CommandType.StoredProcedure);

                return data.Read<City>().ToList();


            }

            return null;
        }



        public async Task<List<Power>> GetPowers()
        {
            using (var connection = _Context.CreateConnection())
            {
                try
                {


                    var powerData = await connection.QueryMultipleAsync("dbo.P_Power_All", commandType: System.Data.CommandType.StoredProcedure);

                    List<Power> list = powerData.Read<Power>().ToList();
                    var Countries = powerData.Read<Country>();
                    var States = powerData.Read<State>();
                    var Cities = powerData.Read<City>();

                    foreach (var item in list)
                    {
                        item.Country = Countries.FirstOrDefault(op => op.CountryId == item.CountryId);
                        item.State = States.FirstOrDefault(op => op.StateId == item.StateId);
                        item.City = Cities.FirstOrDefault(op => op.CityId == item.CityId);
                    }


                    return list;
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }

        }

        public async Task<int> Update(Power power)
        {
             using (var connection = _Context.CreateConnection())
             {
                 var powerInsert = await connection.ExecuteAsync("dbo.P_Power_Update", new
                 {
                     PoewrId = power.PowerId,
                     PowerName = power.PowerName,
                     CountryId = power.CountryId,
                     StateId = power.StateId,
                     CityId = power.CityId,
                     Gender = power.Gender,
                     DOB = power.DOB,
                     PanNo = power.PanNo

                 }, commandType: System.Data.CommandType.StoredProcedure);

                 if (powerInsert > 0)
                 {
                     return 1;
                 }

                 return 0;
             }
         }
            /*
             * 
            public async Task<AttachmentViewModel> DocumentUpload(IFormFile File)
            {
                if (File == null || File.Length == 0)
                {
                    return null;
                }


              //  var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Documents");

                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "C:/AspNetCore_Project/LoanApp/FileUpload/Documents");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var filePath = Path.Combine(uploadPath, File.FileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await File.CopyToAsync(stream);
                }

                var fileUpload = new Attachment
                {
                    AttachmentId = Guid.NewGuid(),
                    FileName = File.FileName,
                    FilePath = filePath,
                    ContentType = File.ContentType,
                    Size = File.Length,
                    UploadDate = DateTime.UtcNow
                };


                var UploadResult = await _attachmentRepository.DocumentUpload(fileUpload);
                if (UploadResult > 0)
                {
                    return  new AttachmentViewModel()
                    {
                        AttachmentId = fileUpload.AttachmentId,
                        FileName = fileUpload.FileName,
                    };
                }
                return null;

            }

            /* public async Task<File> FileDounload(string fileName)
             {
                 fileName = "animal-before.webp";
                 var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents/", fileName);
                 if (!System.IO.File.Exists(filePath)) return null;
                 var memory = new MemoryStream();
                 await using (var stream = new FileStream(filePath, FileMode.Open))
                 {
                     await stream.CopyToAsync(memory);
                 }
                 memory.Position = 0;
                 return (memory);
             }
             private string GetContentType(string path)
             {
                 var provider = new FileExtensionContentTypeProvider();
                 string contentType;
                 if (!provider.TryGetContentType(path, out contentType))
                 {
                     contentType = "application/octet-stream";
                 }
                 return contentType;
             }*/

            /* public async Task<byte[]?> GetUrlContent(string url)
             {
                 using (var client = new HttpClient())
                 using (var result = await client.GetAsync(url))
                     return result.IsSuccessStatusCode ? await result.Content.ReadAsByteArrayAsync() : null;
             }
            */
        
    }
}

