// Create.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Request = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Phone: '',
        Description: '',
        Address: '',
        Date: '',
        StartTime: '',
        EndTime: '',
        RentalItem: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/rentalevent/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Event request sent. A member of our team will reach out to you shortly.');
                navigate('/rentalevent/manage');
            } else {
                console.error('Error requesting event. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <main>
        <div>
            <h2>Create Event Request</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input
                        type="text"
                        id="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                     <label htmlFor="Email">Email</label>
                     <input
                         type="email"
                         id="Email"
                         name="Email"
                         value={formData.Email}
                         onChange={handleInputChange}
                         className="form-control"
                     />
                </div>

                <div className="form-group">
                    <label htmlFor="Phone">Phone</label>
                    <input
                        type="text"
                        id="Phone"
                        name="Phone"
                        value={formData.Phone}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Description">Event Description</label>
                    <input
                        type="text"
                        id="Description"
                        name="Description"
                        value={formData.Description}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Address">Event Address</label>
                    <input
                        type="text"
                        id="Address"
                        name="Address"
                        value={formData.Address}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="Date">Event Date</label>
                    <input
                        type="text"
                        id="Date"
                        name="Date"
                        value={formData.Date}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="StartTime">Start Time</label>
                    <input
                        type="text"
                        id="StartTime"
                        name="StartTime"
                        value={formData.StartTime}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="EndTime">End Time</label>
                    <input
                        type="text"
                        id="EndTime"
                        name="EndTime"
                        value={formData.EndTime}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="RentalItem">Rental Item</label>
                    <input
                        type="text"
                        id="RentalItem"
                        name="RentalItem"
                        value={formData.RentalItem}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                </div>

                <input type="submit" value="Request Event" />
            </form>
            </div>
        </main>
    );
};

export default Request;