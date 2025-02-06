using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MAMIKBankBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileUploadController : ControllerBase
    {
        [Route("FtpServer")]
        [HttpPost]

        public async Task<IActionResult> FileUploadFtp()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string fileName = postedFile.FileName;
                string subFolder = "";

                var url = "ftp://ftp.nethely.hu" + subFolder + "/" + fileName;
                FtpWebRequest request = (FtpWebRequest)WebRequest.Create(url);
                request.Credentials = new NetworkCredential("MAMIKBank", "Spartaiak300");
                request.Method = WebRequestMethods.Ftp.UploadFile;
                await using (Stream ftpStream = request.GetRequestStream())
                {
                    postedFile.CopyTo(ftpStream);
                }
                return Ok(fileName);

            }
            catch (Exception)
            {
                return Ok("default.jpg");
            }
        }

    }
}
