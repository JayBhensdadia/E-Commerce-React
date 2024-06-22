import React, { useState } from "react";
import placeholderImage from "../assets/placeholder.png";
import { LoaderCircle } from "lucide-react";

const CustomImage = ({ url }: { url: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={placeholderImage}
            alt="Placeholder"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <LoaderCircle className="z-50 animate-spin" />
        </div>
      )}
      <img
        src={url}
        alt="Custom"
        onLoad={() => setIsLoading(false)}
        className={`absolute inset-0 w-full h-full object-cover ${
          isLoading ? "hidden" : "block"
        }`}
      />
    </div>
  );
};

export default CustomImage;
