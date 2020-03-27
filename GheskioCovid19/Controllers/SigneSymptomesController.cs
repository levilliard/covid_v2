using System.Collections.Generic;
using System.Linq;
using GheskioCovid19.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace GheskioCovid19.Controllers
{
    [Route("api/[controller]")]
    public class SigneSymptomesController : ControllerBase
    {

        private emrContext _context;

        public SigneSymptomesController(emrContext context)
        {
            _context = context;
        }
        

        [HttpGet]
        [Route("Index")]
        public IEnumerable<SigneSymptomes> Index()
        {
            try
            {
                return _context.SigneSymptomes.Include(r=>r.Resultat).ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("patnetid")]
        public IEnumerable<SigneSymptomes> GetByPatNetId(string id)
        {
            try
            {
                return _context.SigneSymptomes.Where(pa => pa.PatNetId == id).ToList<SigneSymptomes>();
            }
            catch
            {
                throw;
            }
        }
        // GET api/<controller>/5
        [HttpGet("{id}")]
        public SigneSymptomes Get(int id)
        {
            try
            {
                return _context.SigneSymptomes.Find(id);
            }
            catch
            {
                throw;
            }
        }

        // POST api/<controller>
        [HttpPost]
        public string Post([FromBody]SigneSymptomes value)
        {
            try
            {
                _context.SigneSymptomes.Add(value);
                _context.SaveChanges();
                return "ok";
               
            }
            catch
            {
                throw;
            }
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public int Put(int id, [FromBody]SigneSymptomes value)
        {
            int result = -1;

            try
            {
                _context.SigneSymptomes.Update(value);
                _context.SaveChanges();
                result = 1;
            }
            catch
            {
                throw;
            }
            return result;
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            int result = -1;

            try
            {
                SigneSymptomes ss = _context.SigneSymptomes.Find(id);
                _context.SigneSymptomes.Remove(ss);
                _context.SaveChanges();
                result = 1;
            }
            catch
            {
                throw;
            }
            return result;
        }
    }
}
