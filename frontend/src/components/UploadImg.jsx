import { useRef, useState } from 'react';

function UploadImg({ onConversion }) {
  const fileInputRef = useRef(null);
  const [convertedDataURL, setConvertedDataURL] = useState(null);

  const convertToDataURLviaCanvas = (url, callback, outputFormat) => {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
      setConvertedDataURL(dataURL); // Set state to store the converted data URL
      canvas = null;
    };
    img.src = url;
  };

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const dataURL = e.target.result;

        // Call the convertToDataURLviaCanvas function
        convertToDataURLviaCanvas(dataURL, onConversion, 'image/jpeg');
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {convertedDataURL && (
        <div>
          <p>Converted Image:</p>
          <img src={convertedDataURL} alt="Converted" />
        </div>
      )}
    </div>
  );
}

export default UploadImg;

