import { useState } from "react";
import Lottie from "lottie-react";
import newsletterAnim from "../../assets/animations/newsletter.json"; // your Lottie JSON file
import Swal from "sweetalert2";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      Swal.fire("Oops!", "Please enter a valid email.", "warning");
      return;
    }

    // Example: save to backend or email list
    console.log("Subscribed:", email);

    Swal.fire("Success!", "You're now subscribed to our newsletter!", "success");
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-r from-indigo-100 to-blue-100 py-16 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 gap-10">
        {/* Lottie Animation */}
        <div className="md:w-1/2 flex justify-center">
          <Lottie animationData={newsletterAnim} loop={true} className="w-72 md:w-96" />
        </div>

        {/* Text + Form */}
        <div className="md:w-1/2 text-center md:text-left space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Stay Updated With <span className="text-blue-600">TrueNest</span>
          </h2>
          <p className="text-gray-600">
            Subscribe to our newsletter and never miss out on the latest property listings,
            market trends, and exclusive offers.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center gap-3 mt-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="input input-bordered w-full sm:flex-1 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
