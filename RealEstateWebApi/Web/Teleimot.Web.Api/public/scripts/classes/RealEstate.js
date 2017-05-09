//import { Comment } from 'comment';

class RealEstate {
    constructor(model) {
        this.id = model.Id;
        this.title = model.Title;
        this.description = model.Description;
        this.address = model.Address;
        this.createdOn = model.CreatedOn;
        this.constructionYear = model.ConstructionYear;
        this.sellingPrice = model.SellingPrice;
        this.rentingPrice = model.RentingPrice;
        this.canBeSold = model.CanBeSold;
        this.canBeRented = model.CanBeRented;
        this.type = model.RealEstateType;
        if (model.Contact) {
            this.contact = model.Contact;
        }

        if (model.Comments) {
            this.comments = model.Comments.map(x => new Comment(x));
            this.commentsAccessible = true;
        }
    };
    get createdOn() {
        return this._createdOn;
    }

    set createdOn(value) {
        this._createdOn = new Date(value).toLocaleDateString();
    }
};