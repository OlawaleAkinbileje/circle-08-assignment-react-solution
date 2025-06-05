import React, { useState, useEffect } from "react";
import ImagePreviewModal from "./ImagePreviewModal"



  const initialImages = [
    {
      name: "Val Thorens",
      src: "/assets/img/Mask-group.png",
      alt: "Val Thorens",
          description: "",
      liked: false,
    },
    {
      name: "Restaurant terrace",
      src: "/assets/img/pexels-kassandre-pedro-8639743-1.png",
      alt: "Restaurant terrace",
      description: "",
    },
    {
      name: "An outdoor cafe",
      src: "/assets/img/Mask-group-(1).png",
      alt: "An outdoor cafe",
      description: "",
    },
    {
      name: "A long bridge over forest",
      src: "/assets/img/pexels-kassandre-pedro-8639743-1-3.png",
      alt: "A long bridge over forest",
      description: "",
    },
    {
      name: "Tunnel with morning light",
      src: "/assets/img/pexels-kassandre-pedro-8639743-1-4.png",
      alt: "Tunnel with morning light",
      description: "",
    },
    {
      name: "Mountain house",
      src: "/assets/img/pexels-kassandre-pedro-8639743-1-5.png",
      alt: "Mountain house",
      description: "",
    },
  ];


const Gallery = ({ newImage }) => {
    // const [images, setImages] = useState(initialImages);
    const [preview, setPreview] = useState({ open: false, src: "", title: "" });

    const [images, setImages] = useState(() => {
        const saved = localStorage.getItem("galleryImages");
        return saved ? JSON.parse(saved) : initialImages;
    });
    
    useEffect(() => {
        if (newImage) setImages(prev => [{ ...newImage, liked: false }, ...prev]);
    }, [newImage]);

    useEffect(() => {
        localStorage.setItem("galleryImages", JSON.stringify(images));
      }, [images]);
    
    // Toggle liked state
  const handleHeartClick = (index) => {
    setImages(prev =>
      prev.map((img, i) =>
        i === index ? { ...img, liked: !img.liked } : img
      )
    );
  };

    return (
        <main className="site-content">
            <section className="gallery">
                {images.map((image, index) => (
                    <div className="Image-container" key={index}>
                        <figure>
                            <img
                                className="Images"
                                data-name={image.name}
                                src={image.src}
                                alt={image.alt}
                                onClick={() =>
                                    setPreview({
                                        open: true,
                                        src: `${image.src}`,
                                        title: `${image.name}`,
                                    })
                                }
                            />
                            <figcaption className={image.description ? "desc" : "Name-heart"}>
                                <p>{image.name}</p>
                                {image.description && <p>{image.description}</p>}
                                <img
                                    className={`heart-icon${image.liked ? " liked" : ""}`}
                                    src={image.liked ? " /assets/img/Union-red.png" : "/assets/img/Union.png"}
                                    alt="Heart icon"
                                    onClick={() => handleHeartClick(index)}
                                    style={{
                                      cursor: "pointer",
                                    }}
                                />
                            </figcaption>
                        </figure>
                    </div>
                ))}
            </section>
            <ImagePreviewModal
                open={preview.open}
                src={preview.src}
                title={preview.title}
                onClose={() => setPreview({ ...preview, open: false })}
            />
        </main>
    );
};




export default Gallery;
