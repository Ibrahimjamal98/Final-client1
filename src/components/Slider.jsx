import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../style/Slide.css";

const Slide = ({ link, url, caption }) => (
  <div>
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img
        style={{ maxWidth: "100%", height: "700px" }}
        src={url}
        alt={caption}
      />
    </a>
    <h2>{caption}</h2>
  </div>
);

const SlickSlider = () => {
  const fadeImages = [
    {
      url: "https://wallpapers.com/images/hd/blue-logitech-sign-alc3uue7vsss66pn.jpg",
      link: "http://localhost:5173/cart",
    },
    {
      url: "https://dlcdnwebimgs.asus.com/gain/0B4BCFC8-3341-4DA5-97C6-3352C97B3B64/fwebp",
      link: "http://localhost:5173/products",
    },
    {
      url: "https://dlcdnwebimgs.asus.com/gain/241E8EC9-B400-49EE-A462-E41380E8E9EC/fwebp",
    },
    {
      url: "https://images6.alphacoders.com/648/thumb-1920-648632.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Slider {...settings}>
      {fadeImages.map((fadeImage, index) => (
        <Slide key={index} {...fadeImage} />
      ))}
    </Slider>
  );
};

export default SlickSlider;
