namespace Teleimot.Web.Api.Models.RealEstates
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using Common.Constants;
    using Data.Models;
    using Infrastructure.Mappings;

    public class RealEstateRequestModel : IMapFrom<RealEstate>, IValidatableObject
    {
        [Required]
        [MinLength(RealEstateConstants.TitleMinLength, ErrorMessage = RealEstateConstants.TitleLengthMessage)]
        [MaxLength(RealEstateConstants.TitleMaxLength, ErrorMessage = RealEstateConstants.TitleLengthMessage)]
        public string Title { get; set; }

        [Required]
        [MinLength(RealEstateConstants.DescriptionMinLength, ErrorMessage = RealEstateConstants.DescriptionLengthMessage)]
        [MaxLength(RealEstateConstants.DescriptionMaxLength, ErrorMessage = RealEstateConstants.DescriptionLengthMessage)]
        public string Description { get; set; }

        [Required]
        public string Address { get; set; }

        public string Contact { get; set; }

        [Range(RealEstateConstants.MinConstructionYear, int.MaxValue, ErrorMessage = RealEstateConstants.ContructionYearMessage)]
        public int ConstructionYear { get; set; }

        public decimal? SellingPrice { get; set; }

        public decimal? RentingPrice { get; set; }

        public RealEstateType Type { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (!this.SellingPrice.HasValue && !this.RentingPrice.HasValue)
            {
                yield return new ValidationResult("Real estate must be marked as available for selling or available for renting!");
            }
        }
    }
}
