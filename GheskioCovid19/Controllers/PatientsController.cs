using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GheskioCovid19.Models;
using Microsoft.AspNetCore.Mvc;

namespace GheskioCovid19.Controllers
{
    [Route("api/[controller]")]
    public class PatientsController: ControllerBase
    {
        private emrContext _context;

        public PatientsController(emrContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Patients> Get()
        {
            try
            {
                return _context.Patients.ToList();
            }
            catch
            {
                throw;
            }
        }
    }
}
