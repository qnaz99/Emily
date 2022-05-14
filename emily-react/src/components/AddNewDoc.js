import React from 'react'
import "./AddNewDoc.css"
function AddNewDoc() {
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
        const dropZoneElement = inputElement.closest(".drop-zone");
      
        dropZoneElement.addEventListener("click", (e) => {
          inputElement.click();
        });
      
        inputElement.addEventListener("change", (e) => {
          if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
          }
        });
      
        dropZoneElement.addEventListener("dragover", (e) => {
          e.preventDefault();
          dropZoneElement.classList.add("drop-zone--over");
        });
      
        ["dragleave", "dragend"].forEach((type) => {
          dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
          });
        });
      
        dropZoneElement.addEventListener("drop", (e) => {
          e.preventDefault();
      
          if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
          }
      
          dropZoneElement.classList.remove("drop-zone--over");
        });
      });
      
      /**
       * Updates the thumbnail on a drop zone element.
       *
       * @param {HTMLElement} dropZoneElement
       * @param {File} file
       */
      function updateThumbnail(dropZoneElement, file) {
        let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");
      
        // First time - remove the prompt
        if (dropZoneElement.querySelector(".drop-zone__prompt")) {
          dropZoneElement.querySelector(".drop-zone__prompt").remove();
        }
      
        // First time - there is no thumbnail element, so lets create it
        if (!thumbnailElement) {
          thumbnailElement = document.createElement("div");
          thumbnailElement.classList.add("drop-zone__thumb");
          dropZoneElement.appendChild(thumbnailElement);
        }
      
        thumbnailElement.dataset.label = file.name;
      
        // Show thumbnail for image files
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
      
          reader.readAsDataURL(file);
          reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
          };
        } else {
          thumbnailElement.style.backgroundImage = null;
        }
      }
      
    
  return (
    <div>

<head>
  <title>Drag and Drop File Upload</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
  <meta charset="utf-8"></meta>
  <link rel="shortcut icon" href="/assets/favicon.ico"></link>
  <link rel="stylesheet" href="./src/main.css"></link>
</head>

<body>
  <div class="drop-zone">
    <span class="drop-zone__prompt">Drop file here or click to upload</span>
    <input type="file" name="myFile" class="drop-zone__input"></input>
  </div>

  <script src="./src/main.js"></script>
</body>



    </div>
  )
}

export default AddNewDoc