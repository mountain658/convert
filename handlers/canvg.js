import { Canvg } from "https://cdn.skypack.dev/canvg@^4.0.0";

const supportedFormats = [
  {
    name: "Scalable Vector Graphics",
    format: "svg",
    extension: "svg",
    mime: "image/svg+xml",
    from: true,
    to: false,
    internal: "svg"
  },
  {
    name: "Portable Network Graphics",
    format: "png",
    extension: "png",
    mime: "image/png",
    from: false,
    to: true,
    internal: "png"
  },
  {
    name: "Joint Photographic Experts Group",
    format: "jpeg",
    extension: "jpg",
    mime: "image/jpeg",
    from: false,
    to: true,
    internal: "jpeg"
  }
];

let canvas, ctx;

async function init () {

  canvas = document.createElement("canvas");
  ctx = canvas.getContext("2d");

}

function base64ToBytes (base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function doConvert (inputFile, inputFormat, outputFormat) {

  if (inputFormat.format === "svgz") throw "Compressed SVG not supported";

  const string = new TextDecoder().decode(inputFile.bytes);
  const v = await Canvg.fromString(ctx, string);
  v.render();

  const dataURL = canvas.toDataURL(outputFormat.mime);
  const base64 = dataURL.slice(dataURL.indexOf(";base64,") + 8);

  return base64ToBytes(base64);

}

export default {
  name: "Canvg",
  init,
  supportedFormats,
  doConvert
};

