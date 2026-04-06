import React from "react";

const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-black text-white py-3 px-4 flex items-center justify-center font-sans">
      <p className="text-center text-sm md:text-base">
        Festive Elegance Awaits – Eid Sale now live! Limited-time offers on your favorite styles.{" "}
        <a
          href="#"
          className="underline font-medium hover:opacity-80 transition"
        >
          Shop now
        </a>
      </p>
    </div>
  );
};

export default AnnouncementBar;