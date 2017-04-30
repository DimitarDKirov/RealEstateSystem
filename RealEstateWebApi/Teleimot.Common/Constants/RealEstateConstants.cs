namespace Teleimot.Common.Constants
{
    public class RealEstateConstants
    {
        public const int DefaultRealEstateTake = 10;
        public const int DefaultRealEstateSkip = 0;

        public const int TitleMinLength = 5;
        public const int TitleMaxLength = 50;

        public const int DescriptionMinLength = 10;
        public const int DescriptionMaxLength = 1000;

        public const int MinConstructionYear = 1800;

        public const string TitleLengthMessage = "Title must contain between 5 and 50 symbols";
        public const string DescriptionLengthMessage = "Description must contain between 10 and 1000 symbols";
        public const string ContructionYearMessage = "The contruction year musat be after 1800";
    }
}
