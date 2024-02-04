// Create.js
// eslint-disable-next-line
import React from 'react';

const Create = () => {
    return (
        <div>
            <h2>Create Seasoning Item</h2>

            <form asp-controller="Seasoning" asp-action="Create" method="post">
                <div className="form-group">
                    <label asp-for="Name">Seasoning Name</label>
                    <input asp-for="Name" className="form-control" />
                    <span asp-validation-for="Name" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="Description">Seasoning Description</label>
                    <input asp-for="Description" className="form-control" />
                    <span asp-validation-for="Description" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="SeasoningPrice">Seasoning Price</label>
                    <input asp-for="SeasoningPrice" className="form-control" />
                    <span asp-validation-for="SeasoningPrice" className="text-danger"></span>
                </div>

                <div className="form-group">
                    <label asp-for="Quantity">Seasoning InStock Quantity</label>
                    <input asp-for="Quantity" className="form-control" />
                    <span asp-validation-for="Quantity" className="text-danger"></span>
                </div>

                <input type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default Create;

