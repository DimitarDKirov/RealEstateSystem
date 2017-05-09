export class Comment {
    constructor(model) {
        this.content = model.Content;
        this.username = model.UserName;
        this.createdOn = model.CreatedOn;
    }

    get createdOn() {
        return this._createdOn;
    }

    set createdOn(value) {
        this._createdOn = new Date(value).toLocaleString();
    }
}