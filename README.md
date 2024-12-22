doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport" content="width=device-width, initial-scale=1.0")
    title Certificate
    script(src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js")
    style.
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #e7f3ff; /* Light blue */
      }
      .certificate {
        width: 70rem;
        padding: 30px;
        border-radius: 15px;
        text-align: center;
        background: white;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 50rem;
      }
      .certificate::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 150px;
        background: linear-gradient(135deg, #add8e6, #87cefa);
        clip-path: ellipse(80% 50% at 50% 0%);
      }
      .certificate::after {
        content: "Alaa's Apps";
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 120px;
        color: rgba(0, 0, 0, 0.05); /* Transparent black */
        font-weight: bold;
        letter-spacing: 5px;
        white-space: nowrap;
        z-index: 0; /* Behind all other content */
        pointer-events: none;
      }
      .certificate h1 {
        font-size: 26px;
        margin-bottom: 15px;
        text-transform: uppercase;
        color: #333;
        z-index: 1;
      }
      .certificate p {
        font-size: 18px;
        margin: 10px 0;
        color: #555;
        z-index: 1;
      }
      .certificate p.bold {
        font-weight: bold;
        font-size: 20px;
        color: #4682b4; /* Deep blue */
        z-index: 1;
      }
      .certificate .signature {
        margin-top: 30px;
        text-align: right;
        font-style: italic;
        color: #555;
        width: 100%;
        z-index: 1;
      }
      svg.barcode {
        margin-top: 20px;
        margin-bottom: 10px; /* Extra space below barcode */
        padding: 10px; /* Padding around the barcode */
        border-radius: 8px; /* Smooth edges for aesthetics */
        background-color: #fff; /* White background for contrast */
        z-index: 1;
      }
  body
    .certificate
      h1 Certificate of Completion
      p This certifies that
      p.bold #{firstName}
      p has successfully completed the course
      p.bold #{courseName}
      p.bold #{courseDuration}
      p.bold #{earnedAt}
      svg#barcode.barcode
      .signature Signature
    script.
      // Generate the barcode with improved styling
      const firstName = "Alaa";
      const courseId = "1234";
      const studentId = "5678";
      const barcodeValue = `${firstName}-${courseId}-${studentId}`;
      JsBarcode("#barcode", barcodeValue, {
        format: "CODE128",
        fontSize: 16, 
        textMargin: 12,  
        fontOptions: "bold", 
        margin: 15, 
        height: 100, 
        width: 2.5 
      });
