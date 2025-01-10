"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <section className="py-16 px-4 lg:px-24">
      {/* Contact Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 bg-gray-100 rounded-lg text-center shadow-md">
          <h3 className="text-xl font-bold mb-2">Address</h3>
          <p className="text-gray-600">
            Mahogany Bay Village, San Pedro Town, Belize
          </p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg text-center shadow-md">
          <h3 className="text-xl font-bold mb-2">Number</h3>
          <p className="text-gray-600">+1(650) 653-2088</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg text-center shadow-md">
          <h3 className="text-xl font-bold mb-2">Email</h3>
          <p className="text-gray-600">info@remaxbelizemls.com</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-mainColor mb-2">GET IN TOUCH</h2>
        <p className="text-gray-600">Reach out to us for your queries!</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto grid grid-cols-1 gap-6 mb-16">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="p-4 border rounded-lg"
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="p-4 border rounded-lg"
          required
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="p-4 border rounded-lg"
        />
        <Textarea
          name="message"
          placeholder="Message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="p-4 border rounded-lg"
          required
        />
        <Button
          type="submit"
          className="w-full py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
          SEND MESSAGE
        </Button>
      </form>
      {/* Embedded Google Map */}
      <div className="w-full h-[500px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6011.402407668888!2d-87.98483015191063!3d17.901380438792202!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5c6b1e9549d0cf%3A0x53af78d4b509cc11!2sMahogany%20Bay%20Resort%20%26%20Beach%20Club%2C%20Curio%20Collection%20by%20Hilton!5e0!3m2!1sen!2sma!4v1736517423918!5m2!1sen!2sma"
          width="100%"
          height="100%"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"></iframe>
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23493.358960444945!2d-88.3042207!3d16.5388125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f5a051cf8149c73%3A0x74ddcefb49e2e3de!2sMahogany%20Bay%20Village!5e0!3m2!1sen!2sbz!4v1673368413541!5m2!1sen!2sbz"
          width="100%"
          height="100%"
          allowFullScreen={true}
          loading="lazy"
          className="border-0 rounded-lg shadow-md"
          referrerPolicy="no-referrer-when-downgrade"></iframe> */}
      </div>
    </section>
  );
};

export default ContactContent;
