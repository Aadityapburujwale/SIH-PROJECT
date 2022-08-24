import React from "react";

// web3storage
import { Web3Storage } from "web3.storage";

function FileUploadPage({
  selectedFiles,
  setSelectedFiles,
  setCid,
  setSelectedFileNames,
}) {
  // handle the files that are posted take their names and then set them into the selectedFiles array to be post in a
  const changeHandler = async (event) => {
    await setSelectedFileNames((prevFileNames) => {
      return [...prevFileNames, event.target.files[0].name];
    });

    await setSelectedFiles((prevFiles) => {
      console.log([...prevFiles, event.target.files]);

      return [...prevFiles, event.target.files[0]];
    });
  };

  const handleSubmission = (e) => {
    e.preventDefault();

    function getAccessToken() {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgyQzMwOEU0Q2JENDZiMjJBNTEwOTNDNmUyNzY3MTkxYWY2ODFFQzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjEzMTY1ODk1MjksIm5hbWUiOiJwcm9qZWN0IHRva2VuIn0.0nLlkq9N_jjL-KVofRYUgb-E4q-OXAinKrqryE0jGnc";
    }

    function makeStorageClient() {
      return new Web3Storage({ token: getAccessToken() });
    }

    async function storeFiles(files) {
      const client = makeStorageClient();
      const cid = await client.put(files);
      console.log("cid : " + cid);
      return cid;
    }

    async function submitFiles() {
      const cid = await storeFiles(selectedFiles);
      setCid(cid.toString());
    }

    submitFiles();
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler} />
      <button type="submit" onClick={handleSubmission}>
        Submit
      </button>
    </div>
  );
}

export default FileUploadPage;
