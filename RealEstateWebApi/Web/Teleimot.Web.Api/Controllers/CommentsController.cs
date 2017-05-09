namespace Teleimot.Web.Api.Controllers
{
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using System.Web.Http;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Common.Constants;
    using Data.Models;
    using Infrastructure.Validation;
    using Microsoft.AspNet.Identity;
    using Models.Comments;
    using Services.Data.Contracts;
    using System;

    [Authorize]
    public class CommentsController : ApiController
    {
        private readonly ICommentsService comments;

        public CommentsController(ICommentsService comments)
        {
            this.comments = comments;
        }

        [ValidateTake]
        public IHttpActionResult Get(
            int id,
            int skip = CommentConstants.DefaultCommentSkip,
            int take = CommentConstants.DefaultCommentTake)
        {
            var result = this.comments
                .GetAllByRealEstate(id, skip, take)
                .ProjectTo<CommentResponseModel>()
                .ToList();

            return this.Ok(result);
        }

        [ValidateModel]
        public IHttpActionResult Post(CommentRequestModel model)
        {
            var newComment = Mapper.Map<Comment>(model);
            int id;
            try
            {
                id = this.comments.AddNew(newComment, this.User.Identity.GetUserId());
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }

            var result = this.comments
                .GetById(id)
                .ProjectTo<CommentResponseModel>()
                .FirstOrDefault();

            return this.Created($"/api/Comments/{id}", result);
        }

        [HttpGet]
        [Route("api/Comments/ByUser/{id}")]
        [ValidateTake]
        public IHttpActionResult ByUser(
            [Required]string id,
            int skip = CommentConstants.DefaultCommentSkip,
            int take = CommentConstants.DefaultCommentTake)
        {
            var result = this.comments
                .GetAllByUser(id, skip, take)
                .ProjectTo<CommentResponseModel>()
                .ToList();

            return this.Ok(result);
        }
    }
}
