using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GheskioCovid19.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GheskioCovid19.Controllers
{
    [Route("api/[controller]")]
    public class ResultatsController : ControllerBase
    {
        private emrContext _context;

        public ResultatsController(emrContext context)
        {
            _context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public string Get()
        {
            return "we are working on it ....";
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public Resultat Get(int id)
        {
            try
            {
                return _context.Resultat.Find(id);
            }
            catch
            {
                throw;
            }
        }

        // POST api/<controller>
        [HttpPost]
        public int Post([FromBody]Resultat value)
        {
            int result = -1;

            try
            {
                _context.Resultat.Add(value);
                _context.SaveChanges();
                result = 1;
            }
            catch
            {
                throw;
            }

            return result;
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public int Put(int id, [FromBody]Resultat value)
        {
            int result = -1;

            try
            {
                _context.Resultat.Update(value);
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
                Resultat ss = _context.Resultat.Find(id);
                _context.Resultat.Remove(ss);
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
