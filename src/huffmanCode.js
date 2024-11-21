import path from "path";
class HuffmanNode {
  constructor(char, freq, left = null, right = null) {
    this.char = char;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}
const BuildHuffmanTree = (nodes) => {
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift();
    const right = nodes.shift();
    const newNode = new HuffmanNode(null, left.freq + right.freq, left, right);
    nodes.push(newNode);
  }
  return nodes[0];
};
function generateHuffmanCodes(node, code = "", codeMap = {}) {
  if (!node) return;
  if (node.char !== null) {
    codeMap[node.char] = code;
  }
  generateHuffmanCodes(node.left, code + "0", codeMap);
  generateHuffmanCodes(node.right, code + "1", codeMap);

  return codeMap;
}
const calculateFreq = (text) => {
  const map = new Map();
  for (let char of text) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  return Array.from(map.entries()).map(
    ([char, freq]) => new HuffmanNode(char, freq)
  );
};

const encode = (text, codemap) => {
  return text
    .split("")
    .map((char) => codemap[char])
    .join("");
};

const writeBinaryFile = (encodedText) => {
 // console.log(encodedText)
  const bufferArray = [];
  for (let i = 0; i < encodedText.length; i += 8) {
    // Take 8 bits at a time and convert them to a byte
    const byteString = encodedText.slice(i, i + 8).padEnd(8, "0"); // pad the last byte if needed
    bufferArray.push(parseInt(byteString, 2)); // Convert the binary string to a decimal byte
  }
  //console.log(new Uint8Array(bufferArray))
  return new Uint8Array(bufferArray);
};

//MAIN PROCESS DOWN
export const encodef = async (text) => {
  const freqNodes = calculateFreq(text);
  const tree = BuildHuffmanTree(freqNodes);
  const codeMap = generateHuffmanCodes(tree);
  // encoding
  const encodedText = encode(text, codeMap);
  document.getElementById("real-result-encode").innerHTML = encodedText;
  const compressedBuffer = writeBinaryFile(encodedText);
  //console.log(compressedBuffer)
  // encoded and saving it in assests folder

  const codeMapBlob = new Blob([JSON.stringify(tree)], {
    type: "application/json",
  });
//console.log(compressedBuffer)
  const encodedBlob = new Blob([compressedBuffer], {
    type: "application/octet-stream",
  });

  // Create anchor tags
  //const encodedLink = document.createElement("a");

  const codeMapLink = document.createElement("a");
  const txtcompressedELEMENT = document.getElementById("click-txtcompressed")
  const element = document.getElementById("click-codemap");
  element.innerHTML = "";
  txtcompressedELEMENT.innerHTML = "";
  setTimeout(() => {
   element.innerHTML = "download CodeMap";
   txtcompressedELEMENT.innerHTML = "download Compressed txt"
  }, 200);
  // Set Blob URLs
  txtcompressedELEMENT.href = URL.createObjectURL(encodedBlob);
  element.href = URL.createObjectURL(codeMapBlob);

  // Set file names
  txtcompressedELEMENT.download = "txtcompressedk.txt";
  element.download = "codeMapk.json";

  // Simulate clicks to download files
  // encodedLink.click();
  // codeMapLink.click();

  // Clean up
  // URL.revokeObjectURL(encodedLink.href);
  //  URL.revokeObjectURL(codeMapLink.href);
  // both codeMap.js and txtcompressed is needed for decoding
};
export const decodef = async (buffer, tree,externalFile) => {
  // decoding
  let binaryString = "";
// UNDERSTOOD UNTIL HERE
  if(externalFile){
 // console.log("buffer ",buffer)
  for (let byte of buffer) {
    binaryString += byte.toString(2).padStart(8, "0");
  }

 // console.log(binaryString);
}
  let finalText = "";
  const treeObject = JSON.parse(tree);
  let curNode = treeObject;
 
   
  
  //  console.log(typeof treeObject);
  for (let char of (externalFile ? binaryString : buffer)) {
    curNode = char === "0" ? curNode.left : curNode.right;

    if (curNode.char != null) {
      finalText += curNode.char;
      curNode = treeObject;
    }
  }
  document.getElementById("real-result-decode").innerHTML = finalText;
  const encodedBlob = new Blob([finalText], { type: "text/plain" });
  const encodedLink = document.getElementById("click-decodedFile");
  encodedLink.innerHTML = "";
  setTimeout(() => {
    encodedLink.innerHTML = "Download Decoded File"
  }, 200);
  encodedLink.href = URL.createObjectURL(encodedBlob);
  encodedLink.download = "finaldecoded.txt";
};
