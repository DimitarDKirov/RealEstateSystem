namespace Teleimot.Web.Api.Models.Comments
{
    using System.ComponentModel.DataAnnotations;
    using Common.Constants;
    using Data.Models;
    using Infrastructure.Mappings;

    public class CommentRequestModel : IMapFrom<Comment>
    {
        public int RealEstateId { get; set; }

        [Required]
        [MinLength(CommentConstants.ContentMinLength, ErrorMessage = CommentConstants.ContentLengthMessage)]
        [MaxLength(CommentConstants.ContentMaxLength, ErrorMessage = CommentConstants.ContentLengthMessage)]
        public string Content { get; set; }
    }
}
