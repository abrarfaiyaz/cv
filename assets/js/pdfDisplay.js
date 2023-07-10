function displayPDFAsImages(pdfUrl, containerId) {
  pdfjsLib.getDocument(pdfUrl).promise.then(function (pdf) {
    var pages = Array.from({ length: pdf.numPages }, (_, i) => i + 1);
    var promises = pages.map(function (pageNumber) {
      return pdf.getPage(pageNumber).then(function (page) {
        var scale = 1.5;
        var viewport = page.getViewport({ scale: scale });
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        return page.render(renderContext).promise.then(function () {
          var imageDataURL = canvas.toDataURL();
          var image = new Image();
          image.src = imageDataURL;

          var container = document.getElementById(containerId);
          container.appendChild(image);
        });
      });
    });

    Promise.all(promises).then(function () {
      var spinner = document.getElementById("loading-spinner");
      spinner.style.display = "none";
    });
  });
}

// function checkPDFExists(pdfUrl) {
//     var xhr = new XMLHttpRequest();
//     xhr.open('HEAD', pdfUrl, true);
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           console.log('PDF exists!');
//         } else {
//           console.log('PDF not found!');
//         }
//       }
//     };
//     xhr.send();
//   }