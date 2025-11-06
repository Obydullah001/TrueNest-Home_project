import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const OurLocation = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetch("/properties.json")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  return (
    <main className="mt-3">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-6 md:px-16 text-center">
        <h1 className="text-5xl font-bold mb-4">Our Global Presence</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Prime Properties operates across continents, connecting people with homes and investments worldwide.
        </p>
      </section>

      {/* Map Section */}
<section
  id="property-locations"
  className="scroll-mt-32 pt-32 px-6 md:px-16"
>
  <h2 className="text-4xl font-bold mb-12 text-center">Property Locations</h2>
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-12 items-start">
    {/* Left: Map */}
    <div className="md:w-2/3 w-full h-[500px] rounded-lg shadow-lg">
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => (
          <Marker key={property.id} position={[property.latitude, property.longitude]}>
            <Popup>
              <strong>{property.name}</strong><br />
              {property.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>

    {/* Right: Description */}
    <div className="md:w-1/3 w-full">
      <h3 className="text-2xl font-semibold mb-4">Explore Our Global Reach</h3>
      <p className="mb-4">
        Prime Properties spans the globe, offering premium real estate in vibrant cities and serene retreats.
        Our interactive map showcases the diversity of our listings—from luxury villas in Bali to penthouses in New York.
      </p>
      <p>
        Whether you're looking for investment opportunities or your dream home, our global presence ensures
        you’ll find the perfect property in the perfect place.
      </p>
    </div>
  </div>
</section>
      {/* Regional Highlights */}
      <section className=" py-20 px-6 md:px-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Regional Highlights</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {[
            { region: "Asia", desc: "Luxury apartments and smart investments in Dhaka, Tokyo, and Singapore." },
            { region: "Europe", desc: "Historic homes and countryside villas in Tuscany, Paris, and Santorini." },
            { region: "Americas", desc: "Beach houses, city condos, and eco lodges from New York to Costa Rica." },
          ].map((item, index) => (
            <div key={index} className=" p-8 rounded-xl shadow hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-4">{item.region}</h3>
              <p className="">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Office Locations */}
      <section className=" py-20 px-6 md:px-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Offices</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {[
            { city: "Dhaka", address: "123 Real Estate Ave, Dhaka, Bangladesh", phone: "+880 1234 567890" },
            { city: "New York", address: "456 Manhattan Blvd, NY, USA", phone: "+1 212 555 7890" },
            { city: "London", address: "789 Regent St, London, UK", phone: "+44 20 7946 0123" },
            { city: "Sydney", address: "321 Harbour View, Sydney, Australia", phone: "+61 2 9876 5432" },
          ].map((office, index) => (
            <div key={index} className=" p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{office.city} Office</h3>
              <p className="">{office.address}</p>
              <p className="">Phone: {office.phone}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="  py-20 px-6 md:px-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Want to Visit or Invest?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Reach out to our global team and discover your next property destination.
        </p>
        <button className="bg-primary text-white font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-100 transition">
          Contact Us
        </button>
      </section>
    </main>
  );
};

export default OurLocation;