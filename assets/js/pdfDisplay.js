

function checkPDFExists(pdfUrl) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', pdfUrl, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('PDF exists!');
        } else {
          console.log('PDF not found!');
        }
      }
    };
    xhr.send();
  }