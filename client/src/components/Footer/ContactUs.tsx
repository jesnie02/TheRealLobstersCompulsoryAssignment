import { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);
        alert("Thank you for your message! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' }); // Reset form after submission
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-6 max-w-screen-md w-full">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Message</span>
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary w-full">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;