namespace Teleimot.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using Common.Constants;

    public class RealEstate
    {
        private ICollection<Comment> comments;

        public RealEstate()
        {
            this.comments = new HashSet<Comment>();
        }

        [Key]
        public int Id { get; set; }

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

        [Required]
        public string Contact { get; set; }

        [Range(RealEstateConstants.MinConstructionYear, int.MaxValue, ErrorMessage = RealEstateConstants.ContructionYearMessage)]
        public int ConstructionYear { get; set; }

        public decimal? SellingPrice { get; set; }

        public decimal? RentingPrice { get; set; }

        public RealEstateType Type { get; set; }

        public DateTime CreatedOn { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }

        public virtual ICollection<Comment> Comments
        {
            get { return this.comments; }
            set { this.comments = value; }
        }
    }
}
