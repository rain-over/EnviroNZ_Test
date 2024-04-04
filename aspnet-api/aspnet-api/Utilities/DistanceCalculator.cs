namespace aspnet_api.Utilities
{
    public class DistanceCalculator : IDistanceCalculator
    {
        public double CalculateDistanceByHaversineFormula(double x1, double y1, double x2, double y2)
        {
            double earthRadius = 6371; // Radius of the Earth in kilometers

            double dx = ToRadians(x2 - x1);
            double dy = ToRadians(y2 - y1);

            double a = Math.Sin(dx / 2) * Math.Sin(dx / 2) +
                       Math.Cos(ToRadians(x1)) * Math.Cos(ToRadians(x2)) *
                       Math.Sin(dy / 2) * Math.Sin(dy / 2);

            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            double distance = earthRadius * c;
            return distance;
        }

        static double ToRadians(double degrees)
        {
            return degrees * Math.PI / 180;
        }


    }
}
