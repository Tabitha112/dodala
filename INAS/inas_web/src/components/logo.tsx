// src/components/Logo.js

 // Assure-toi du chemin correct vers ton logo

const Logo = ({ width = 120, height = 120, altText = "Logo" }) => {
  return (
    <div>
      <img src='/logo.svg' alt={altText} width={width} height={height} />
    </div>
  );
};

export default Logo;
