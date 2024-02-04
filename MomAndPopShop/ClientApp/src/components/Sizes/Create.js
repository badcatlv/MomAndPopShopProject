// Create.js
// eslint-disable-next-line
import React from 'react';

const Create = () => {
    return (
        <div>
            <h2>Create Size Item</h2>

            <form asp-controller="Sizes" asp-action="Create" method="post">
                <div className="form-group">
                    <label asp-for="Name">Size Name</label>
                    <input asp-for="Name" className="form-control" />
                    <span asp-validation-for="Name" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="Description">Size Description</label>
                    <input asp-for="Description" className="form-control" />
                    <span asp-validation-for="Description" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="SizesPrice">Size Price</label>
                    <input asp-for="SizesPrice" className="form-control" />
                    <span asp-validation-for="SizesPrice" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="Quantity">Size InStock Quantity</label>
                    <input asp-for="Quantity" className="form-control" />
                    <span asp-validation-for="Quantity" className="text-danger"></span>
                </div>

                <input type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default Create;
