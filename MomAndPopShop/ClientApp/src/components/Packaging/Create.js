// Create.js
// eslint-disable-next-line
import React from 'react';

const Create = () => {
    return (
        <div>
            <h2>Create Packaging Item</h2>

            <form asp-controller="Packaging" asp-action="Create" method="post">
                <div className="form-group">
                    <label asp-for="Name">Packaging Name</label>
                    <input asp-for="Name" className="form-control" />
                    <span asp-validation-for="Name" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="Description">Packaging Description</label>
                    <input asp-for="Description" className="form-control" />
                    <span asp-validation-for="Description" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="PackagingPrice">Packaging Price</label>
                    <input asp-for="PackagingPrice" className="form-control" />
                    <span asp-validation-for="PackagingPrice" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="Quantity">Packaging InStock Quantity</label>
                    <input asp-for="Quantity" className="form-control" />
                    <span asp-validation-for="Quantity" className="text-danger"></span>
                </div>

                <input type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default Create;

