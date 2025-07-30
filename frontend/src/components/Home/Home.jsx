import { useState, useEffect } from "react";
import "../Home/Home.css"; 

const images = [
  "/images/Animation1.jpg",
  "/images/Animation2.jpg",
  "/images/Animation3.jpg",
  "/images/Animation4.jpg",
  "/images/Animation5.jpg",
  "/images/Animation6.jpg",
  "/images/Animation7.jpg",
  "/images/Animation8.jpg",
  "/images/Animation9.jpg",
  "/images/Animation10.jpg",
  "/images/Animation11.jpg",
  "/images/Animation12.jpg",
  "/images/Animation13.jpg",
  "/images/Animation14.jpg",
  "/images/Animation15.jpg",
  "/images/Animation16.jpg",
  "/images/Animation17.jpg",
  "/images/Animation18.jpg",
  "/images/Animation19.jpg",
  "/images/Animation20.jpg",
  "/images/Animation21.jpg",
  "/images/Animation22.jpg",
  "/images/Animation23.jpg",
  "/images/Animation24.jpg",
  "/images/Animation25.jpg",
  "/images/Animation26.jpg",
  "/images/Animation27.jpg",
  "/images/Animation28.jpg",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0); // State to track the current image index

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      ); // Reset to first image after last
      // This ensures the slideshow loops continuously
    }, 3000 );  // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []); // Cleanup interval on component unmount

  return (
    <section className="homeSection">
      <div className="leftSide">
        <div className="slideshowContainer">
        {/* Slideshow container to hold images */}
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Catalogue ${index + 1}`}
              className={`slideImage ${
                index === currentIndex ? "active" : "inactive"
              }`}
            />
          ))}
        </div>
        </div>

      <div className="rightSide">
        <h2 className="heading">Why Yuvathees Wardrobe?</h2>
        <p className="subheading">
          <em>A Journey Through India’s Rich Textile Heritage, Straight From The House Of Weavers.</em>
        </p>

        <p>From Kashmir to Kanyakumari, every corner of India tells a story through its fabric.</p>

        <p>
          At <strong>Yuvathees Wardrobe</strong>, we don’t just curate garments, we celebrate the<strong> diversity, craftsmanship, and heritage</strong> of Indian textiles. From ready-made suits to pure silk sarees,
          our collection brings together wardrobe essentials from across the nation.
        </p>

        <p>
          For centuries, clothing in India reflected its environment. It was shaped by the <strong> climate, lifestyle, and traditions</strong> of its people. Today, as Indians make homes around the world,
          our culture and attire have found <strong>global admiration</strong>, reaching far beyond our borders.
        </p>

        <p>
          The fashion industry has embraced this journey, offering designs that blend 
          <strong> heritage with innovation</strong>. Still, the soul of each garment lives in the hands of 
          <strong> local weavers</strong>, who carry forward generations of skill, tradition, and storytelling.
        </p>

        <p>
          At <strong>Yuvathees Wardrobe</strong>, we proudly source directly from the <strong> House of Weavers</strong>, ensuring that
          every piece stays true to its roots while supporting the artisans who keep these traditions alive.
        </p>

        <p>
          So how do you bring authentic treasures from the House of Weavers into your wardrobe?<br />
          We are the answer!
        </p>
      </div>
    </section>
  );
}
