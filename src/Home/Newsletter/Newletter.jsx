import React from 'react';

const Newletter = () => {
    return (
        <div>
            <section className=" py-20 px-6 md:px-16">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-3xl md:text-4xl mb-4">Stay Updated</h2>
    <p className=" mb-8">
      Subscribe to our newsletter and be the first to know about new listings, market insights, and exclusive offers.
    </p>
    <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full sm:w-2/3 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Subscribe
      </button>
    </form>
    <p className="text-sm mt-4">
      We respect your privacy. Unsubscribe anytime.
    </p>
  </div>
</section>
        </div>
    );
};

export default Newletter;