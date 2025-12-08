const supportedFormats = [
  {
    name: "Scalable Vector Graphics",
    format: "svg",
    extension: "svg",
    mime: "image/svg+xml",
    from: false,
    to: true,
    internal: "svg"
  },
  {
    name: "Portable Network Graphics",
    format: "png",
    extension: "png",
    mime: "image/png",
    from: true,
    to: false,
    internal: "png"
  },
  {
    name: "Joint Photographic Experts Group",
    format: "jpeg",
    extension: "jpg",
    mime: "image/jpeg",
    from: true,
    to: false,
    internal: "jpeg"
  }
];

async function init () {

}

async function doConvert (inputFile, inputFormat, outputFormat) {

  const blob = new Blob([inputFile.bytes], { type: inputFormat.mime });
  const url = URL.createObjectURL(blob);

  let image = document.createElement("img");
  await new Promise((resolve, reject) => {
    image.addEventListener("load", resolve);
    image.src = url;
  });

  const base64 = btoa(String.fromCharCode.apply(null, inputFile.bytes));

  const output = `
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1920" height="1080"><g>
      <image width="${image.naturalWidth}" height="${image.naturalHeight}" xlink:href="data:${inputFormat.mime};base64,${base64}"/>
    </g></svg>`;

  return new TextEncoder().encode(output);

}

export default {
  name: "img2svg",
  init,
  supportedFormats,
  doConvert
};


