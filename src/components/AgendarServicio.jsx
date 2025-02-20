import React, { useState } from "react";

const AgendarServicio = () => {
  const [media, setMedia] = useState([
    { type: "image", url: "/Exterior.jpeg", model: "Honda CR-V" },
    {
      type: "image",
      url: "/Exterior2.jpg",
      model: "Jeep Grand Cherokee SRT",
    },
    { type: "image", url: "/Exterior3.jpg", model: "Jeep Compass" },
    {
      type: "image",
      url: "/Exterior4.jpg",
      model: "Chevrolet Camaro LT",
    },
    { type: "image", url: "/Exterior5.jpg", model: "Honda Civic SI" },
    { type: "video", url: "/exterior1.mp4", model: "Jeep Mojave" },
    { type: "video", url: "/exterior2.mp4", model: "Honda CR-V" },
    { type: "video", url: "/exterior3.mp4", model: "BMW 528i" },
    { type: "video", url: "/Exterior.mp4", model: "Chevrolet Camaro SS" },
    { type: "video", url: "/exterior5.mp4", model: "Honda CR-V Turbo" },
  ]);

  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaClick = (item) => {
    setSelectedMedia(item);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  return (
    <div
      id="galeria"
      className="relative p-8 mx-auto bg-white rounded-lg shadow-lg max-w-7xl"
    >
      {/* Imagen de fondo */}
      <div>
        <img
          src="/Servicios.jpg"
          alt="Background Servicios"
          className="absolute inset-0 object-cover w-full h-full pointer-events-none opacity-10 z-[-1]"
        />
      </div>

      <h2 className="mb-6 text-4xl font-bold text-center text-gray-800">
        Galería de Trabajos
      </h2>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {media.map((item, index) => (
          <div key={index} className="relative group">
            {item.type === "image" ? (
              <img
                src={item.url}
                alt={`Trabajo ${index + 1}`}
                className="object-cover w-full transition transform rounded-lg h-80 group-hover:scale-110 group-hover:shadow-xl"
                onClick={() => handleMediaClick(item)}
              />
            ) : (
              <video
                src={item.url}
                loop
                muted
                autoPlay
                className="object-cover w-full transition transform rounded-lg h-80 group-hover:scale-110 group-hover:shadow-xl"
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => e.target.pause()}
                onClick={() => handleMediaClick(item)}
              />
            )}
            <div className="absolute p-2 text-lg font-semibold text-white transition-opacity duration-300 bg-black bg-opacity-50 rounded opacity-0 bottom-4 left-4 group-hover:opacity-100">
              {item.model}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de visualización */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl max-h-full overflow-hidden transition-all duration-300 ease-in-out transform bg-white rounded-lg">
            {selectedMedia.type === "video" ? (
              <video
                src={item.url}
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full transition transform rounded-lg h-80 group-hover:scale-110 group-hover:shadow-xl"
                onClick={() => handleMediaClick(item)}
              />
            ) : (
              <img
                src={selectedMedia.url}
                alt="Media"
                className="object-cover w-full h-96"
              />
            )}

            <button
              onClick={closeModal}
              className="absolute p-3 text-white bg-gray-800 rounded-full top-4 right-4 bg-opacity-70 hover:bg-gray-600"
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgendarServicio;
