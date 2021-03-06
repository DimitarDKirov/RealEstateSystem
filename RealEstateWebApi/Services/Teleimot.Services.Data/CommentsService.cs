﻿namespace Teleimot.Services.Data
{
    using System;
    using System.Linq;
    using System.Linq.Expressions;
    using Contracts;
    using Teleimot.Data.Models;
    using Teleimot.Data.Repositories;

    public class CommentsService : ICommentsService
    {
        private readonly IRepository<Comment> comments;
        private readonly IRepository<RealEstate> realEstates;

        public CommentsService(IRepository<Comment> comments, IRepository<RealEstate> realEstates)
        {
            this.comments = comments;
            this.realEstates = realEstates;
        }

        public IQueryable<Comment> GetAllByRealEstate(int realEstateId, int skip, int take)
        {
            return this.SortAndPageComments(c => c.RealEstateId == realEstateId, skip, take);
        }

        public IQueryable<Comment> GetById(int id)
        {
            return this.comments
                .All()
                .Where(r => r.Id == id);
        }

        public IQueryable<Comment> GetAllByUser(string username, int skip, int take)
        {
            return this.SortAndPageComments(c => c.User.UserName == username, skip, take);
        }

        public int AddNew(Comment comment, string userId)
        {
            var realEstate = this.realEstates.GetById(comment.RealEstateId);
            if (realEstate == null)
            {
                throw new ArgumentException("Real estate wtih given Id could not be found");
            }

            comment.CreatedOn = DateTime.UtcNow;
            comment.UserId = userId;

            this.comments.Add(comment);
            this.comments.SaveChanges();

            return comment.Id;
        }

        private IQueryable<Comment> SortAndPageComments(
            Expression<Func<Comment, bool>> filterExpression,
            int skip,
            int take)
        {
            return this.comments
                .All()
                .Where(filterExpression)
                .OrderBy(c => c.CreatedOn)
                .Skip(skip)
                .Take(take);
        }
    }
}
