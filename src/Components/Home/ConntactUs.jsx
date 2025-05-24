import React from 'react'

export const ConntactUs = () => {
  return (
     <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          We'd love to hear from you! Please fill out the form below or reach out using the contact details.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className="md:order-2"> {/* Form on the right for md screens and up */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a message</h2>
            <form  className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Your message to us..."
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="md:order-1 flex flex-col justify-center"> {/* Info on the left for md screens and up */}
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Contact Details</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <svg className="h-7 w-7 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.987 11.236l.01-.005a6 6 0 00.977-11.231zM10 13a3 3 10-6 0 3zm-3.237 3.328a8 8 0 10-.12 1.344l-.001.001A8 8 0 006.763 16.328z" clipRule="evenodd"></path>
                </svg>
                <div>
                  <p className="text-lg text-gray-700 font-semibold">Address:</p>
                  <p className="text-md text-gray-600">123 ChatApp Street, Suite 456</p>
                  <p className="text-md text-gray-600">Tech City, CA 90210, USA</p>
                </div>
              </div>

              <div className="flex items-center">
                <svg className="h-7 w-7 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <div>
                  <p className="text-lg text-gray-700 font-semibold">Email:</p>
                  <p className="text-md text-gray-600">support@chatapp.com</p>
                </div>
              </div>

              <div className="flex items-center">
                <svg className="h-7 w-7 text-gray-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.003 11.003 0 006.107 6.107l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <div>
                  <p className="text-lg text-gray-700 font-semibold">Phone:</p>
                  <p className="text-md text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
