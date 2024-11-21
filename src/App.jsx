import { useState } from "react";
import "./App.css";
import { encodef } from "./huffmanCode";
import { decodef } from "./huffmanCode";
function App() {
  const [getCodeMap, setCodeMap] = useState();
  const [inputEncode, setInputEncode] = useState();
  const [inputDecode, setInputDecode] = useState();
  const [codeMapName, setCodeMapName] = useState();
  const [choooseFileEncode, SetChooseFileEncode] = useState();
  const [choooseFileDecode, SetChooseFileDecode] = useState();
  return (
    <>
      <div className="full-Page">
        <div id="encode">
          <div id="title-encode">
            HuffMan Encoder
            <label for="orEncodeFile" id="chooseFile-encode">
              or Choose file?
            </label>
          </div>
          <input
            type="file"
            id="orEncodeFile"
            accept=".txt"
            onChange={(e) => {
              SetChooseFileEncode(e.target.files[0]);
            }}
          />
          {!choooseFileEncode && (
            <textarea
              id="input-encode"
              value={inputEncode}
              onChange={(e) => setInputEncode(e.target.value)}
              placeholder="enter something to encode"
            />
          )}
          {choooseFileEncode && (
            <>
              <div id="EselectedFile">
                selected File: {choooseFileEncode.name}
              </div>
              <div id="EclearChosenFile" onClick={() => SetChooseFileEncode()}>
                X
              </div>
            </>
          )}
          <div
            id="compress-encode"
            onClick={() => {
              if (choooseFileEncode) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                  const fileContent = e.target.result;
                  encodef(fileContent);
                };
                reader.readAsText(choooseFileEncode);
              } else {
                encodef(inputEncode);
              }
            }}
          >
            Compress
          </div>
          <div id="result-encode">
            <div>Encoder Result:</div> <div id="real-result-encode"> </div>
          </div>
            <div id="txt-codemap-download">
          <a id="click-txtcompressed"></a>
          <a id="click-codemap"></a>
            </div>
        </div>
        <div id="decode">
          <div id="result-decode">
            <div>
              Decoded Result:<div id="real-result-decode"></div>
            </div>
          </div>
          <div id="txt-codemap-download">
          <a id="click-decodedFile"></a>
            </div>
          <div id="title-decode">
            HuffMan Decoder{" "}
            <label for="orDecodeFile" id="chooseFile-encode">
              or Choose file?
            </label>
          </div>
          <input
            type="file"
            id="orDecodeFile"
            accept=".txt"
            onChange={(e) => {
              SetChooseFileDecode(e.target.files[0]);
            }}
          />
          {!choooseFileDecode && (
            <textarea
              id="input-decode"
              placeholder="enter something to decode (Encoder Resut)"
              value={inputDecode}
              onChange={(e) => {
                setInputDecode(e.target.value);
              }}
            />
          )}
          {choooseFileDecode && (
            <>
              <div id="EselectedFile">
                selected File: {choooseFileDecode.name}
              </div>
              <div id="EclearChosenFile" onClick={() => SetChooseFileDecode()}>
                X
              </div>
            </>
          )}
          <div
            id="click-to-decode"
            onClick={() => {
              if (choooseFileDecode) {
                const reader = new FileReader();
                reader.onload = async (e) => {
                  const fileContent = e.target.result;
                  //console.log(fileContent)
                  //console.log((103).toString(2).padStart(8,'0'))
                  const byteArray = new Uint8Array(fileContent); // Convert ArrayBuffer to a Uint8Array
                 // console.log(byteArray);
                  decodef(byteArray,getCodeMap,true)
                };
                reader.readAsArrayBuffer(choooseFileDecode);
              } else {
                decodef(inputDecode, getCodeMap,false);
              }
            }}
          >
            Decrypt
          </div>
          <div>
            <label for="codeMapInput" id="fileinput">
              put code-map {codeMapName}{" "}
            </label>
            <input
              type="file"
              id="codeMapInput"
              accept=".json"
              onChange={(e) => {
                const reader = new FileReader();
                reader.onload = async (e) => {
                  const f = e.target.result;
                  setCodeMap();

                  setCodeMap(f);
                  //console.log(f);
                };
                reader.readAsText(e.target.files[0]);
                setCodeMapName();
                setCodeMapName("(" + e.target.files[0].name + ")");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
