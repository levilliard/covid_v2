using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GheskioCovid19.Models;
using Microsoft.AspNetCore.Mvc;

namespace GheskioCovid19.Controllers
{
    [Route("api/[controller]")]
    public class EnteteVisiteController : ControllerBase
    {
        private emrContext _context;

        public EnteteVisiteController(emrContext context)
        {
            _context = context;

        }

        [HttpGet("patnetid")]
        public IEnumerable<V_ENTETE_VISITE_COVID> Get(String id)
        {
            try
            {
                return _context.EnteteVisite.Where(pa => pa.PAT_NET_ID == id).ToList<V_ENTETE_VISITE_COVID>();
            }
            catch
            {
                throw;
            }
        }
    }
}
