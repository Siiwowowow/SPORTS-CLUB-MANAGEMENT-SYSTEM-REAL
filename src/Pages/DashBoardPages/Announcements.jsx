import React from 'react';
import Review from '../Share/Review/Review';

const Announcements = () => {
  return (
    <div className="font-poppins px-4">
      <h1 className="text-3xl font-semibold text-center mx-auto">
        Latest Announcements
      </h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
        Stay updated with the latest events, court updates, and club news to
        enhance your sports experience.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-6 h-auto md:h-[400px] w-full max-w-5xl mt-10 mx-auto">
        {/* Announcement 1 */}
        <div className="relative group flex-grow transition-all w-full md:w-56 h-[300px] md:h-[400px] duration-500 hover:w-full overflow-hidden rounded-xl">
          <img
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&h=400&auto=format&fit=crop"
            alt="New Court Booking System"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-2xl md:text-3xl">New Booking System</h1>
            <p className="text-xs md:text-sm">
              Book your favorite courts seamlessly with our upgraded online
              booking platform.
            </p>
          </div>
        </div>

        {/* Announcement 2 */}
        <div className="relative group flex-grow transition-all w-full md:w-56 h-[300px] md:h-[400px] duration-500 hover:w-full overflow-hidden rounded-xl">
          <img
            className="h-full w-full object-cover object-right transition-transform duration-500 group-hover:scale-105"
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&h=400&auto=format&fit=crop"
            alt="Summer Tournaments"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-2xl md:text-3xl">Summer Tournaments</h1>
            <p className="text-xs md:text-sm">
              Register now for our upcoming summer tournaments and compete with
              fellow club members.
            </p>
          </div>
        </div>

        {/* Announcement 3 */}
        <div className="relative group flex-grow transition-all w-full md:w-56 h-[300px] md:h-[400px] duration-500 hover:w-full overflow-hidden rounded-xl">
          <img
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&h=400&auto=format&fit=crop"
            alt="Membership Benefits"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-2xl md:text-3xl">Membership Benefits</h1>
            <p className="text-xs md:text-sm">
              Enjoy exclusive discounts, priority booking, and special events
              as a valued club member.
            </p>
          </div>
        </div>
      </div>
        <h2 className="text-2xl font-semibold text-center mt-10">
            What Our Members Say </h2>
      <Review></Review>
    </div>
  );
};

export default Announcements;
