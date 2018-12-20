using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IVehicleRepository
    {
    Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
    Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery vehicleQuery);
    void Add(Vehicle vehicle);
    void Remove(Vehicle vehicle);

    }
}