import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAuth from '../../hooks/UseAuth/useAuth';
import useAxiosSecure from '../../hooks/AxiosHooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const MakeOffer = () => {
  const { id } = useParams(); // propertyId
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [offerAmount, setOfferAmount] = useState('');
  const [buyingDate, setBuyingDate] = useState('');

  // Fetch property info
  const { data: property, isLoading } = useQuery({
    queryKey: ['property', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (!property) return <p className="text-center">Property not found</p>;

const minPrice = parseFloat(property.startingPrice);
const maxPrice = parseFloat(property.endingPrice);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const offer = parseFloat(offerAmount);
    if (isNaN(offer) || offer < minPrice || offer > maxPrice) {
      return toast.error(`Offer must be between ৳${minPrice} and ৳${maxPrice}`);
    }

    const offerData = {
      propertyId: id,
      propertyTitle: property.title,
      propertyImage: property.image,
      propertyLocation: property.location,
      agentName: property.agentName,
      agentEmail: property.agentEmail,
      offerAmount: offer,
      buyerEmail: user?.email,
      buyerName: user?.displayName,
      buyingDate: buyingDate || format(new Date(), 'yyyy-MM-dd'),
      status: 'pending',
    };

    try {
      const res = await axiosSecure.post('/offers', offerData);
      if (res.data.insertedId) {
        toast.success('Offer submitted successfully');
        navigate('/dashboard/property-bought');
      } else {
        toast.error('Failed to submit offer');
      }
    } catch (error) {
      const  errorCode = error.code
      toast.error('Server error while submitting offer', errorCode);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded border border-secondary space-y-4">
      <h2 className="text-xl font-semibold text-center">Make an Offer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" readOnly value={property.title} className="input input-bordered w-full" />
        <input type="text" readOnly value={property.location} className="input input-bordered w-full" />
        <input type="text" readOnly value={property.agentName} className="input input-bordered w-full" />
        <input
          type="number"
          required
          placeholder={`Enter offer amount between ${minPrice} - ${maxPrice}`}
          className="input input-bordered w-full"
          value={offerAmount}
          onChange={(e) => setOfferAmount(e.target.value)}
        />
        <input type="text" readOnly value={user?.email} className="input input-bordered w-full" />
        <input type="text" readOnly value={user?.displayName} className="input input-bordered w-full" />
        <input
          type="date"
          className="input input-bordered w-full"
          value={buyingDate}
          onChange={(e) => setBuyingDate(e.target.value)}
          required
        />
        <button className="btn btn-primary w-full">Submit Offer</button>
      </form>
    </div>
  );
};

export default MakeOffer;
