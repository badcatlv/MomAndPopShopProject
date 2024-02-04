// Create.js
// eslint-disable-next-line
import React from 'react';

const Create = () => {
    return (
        <div>
            <h2>Create Popcorn Item</h2>

            <form asp-controller="Popcorn" asp-action="Create" method="post">
                <div className="form-group">
                    <label asp-for="Name">Popcorn Name</label>
                    <input asp-for="Name" className="form-control" />
                    <span asp-validation-for="Name" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="Description">Popcorn Description</label>
                    <input asp-for="Description" className="form-control" />
                    <span asp-validation-for="Description" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="PopcornPrice">Popcorn Price</label>
                    <input asp-for="PopcornPrice" className="form-control" />
                    <span asp-validation-for="PopcornPrice" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="Quantity">Popcorn InStock Quantity</label>
                    <input asp-for="Quantity" className="form-control" />
                    <span asp-validation-for="Quantity" className="text-danger"></span>
                </div>

                <input type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default Create;