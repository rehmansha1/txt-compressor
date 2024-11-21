import React from 'react'

export default function Compo() {
  return (
    <div>      <div id="Box1">
    <div>Encode</div>
    <div>
      <input
        type="file"
        accept=".txt"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = async (e) => {
            const fileContent = e.target.result;
            console.log(fileContent);
            encodef(fileContent);
          };
          reader.readAsText(file);
        }}
      />
    </div>
  </div>
  <div id="Box2">
    Decode
    <div id="innerbox2">
      <div>
        <input
          type="file"
          accept=".txt"
          onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = async (e) => {
              const fileContent = e.target.result;
              const byteArray = new Uint8Array(fileContent);  // Convert ArrayBuffer to a Uint8Array
              console.log(byteArray);
              
              setGetencoded(byteArray);
            };
            reader.readAsArrayBuffer(file);
          }}
        />{" "}
        <span>select encodedTxt</span>
      </div>
      <div>
        <input
          type="file"
          accept=".json"
          onChange={(e) => {
            setGetCodeMap(e.target.files[0]);
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = async (e) => {
              const fileContent = e.target.result;
              console.log(fileContent);
              setGetCodeMap(fileContent);
            };
            reader.readAsText(file);
          }}
        />{" "}
        <span>select CodeMap</span>
      </div>
      <div id="f" onClick={() => {decodef(getencoded,getCodeMap)}}>
        click to decode{" "}
      </div>
    </div>
  </div></div>
  )
}
