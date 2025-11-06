import React from 'react';


const HighlightsNearYou = [
  {
    name: "Airport",
    distance: "15 mins drive",
    image:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Shopping Mall",
    distance: "15 mins drive",
    image:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "Central Park",
    distance: "20 mins drive",
    image:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  },
  {
    name: "University",
    distance: "30 mins drive",
    image:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600",
  }
];

const HighlightsNearby = () => {
    return (
        <div>
            <h1 className='text-6xl'>Highlights Nearby</h1>
        </div>
    );
};

export default HighlightsNearby;