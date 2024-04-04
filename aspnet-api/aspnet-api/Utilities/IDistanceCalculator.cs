namespace aspnet_api.Utilities
{
    public interface IDistanceCalculator
    {
        double CalculateDistanceByHaversineFormula(double x1, double y1, double x2, double y2);
    }
}
