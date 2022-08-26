import React from "react";
import { Button } from "@mui/material";
// web3storage
import { Web3Storage } from "web3.storage";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDExODFkQjQzQUM2YTFmREI5OWE3MjdiOTExMUU0YjAzNTExZTZmODYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA2MTY0MTgxMDQsIm5hbWUiOiJkZWZpIn0.5vQx7yMdU45A65sLj9tyo1dI9Vyb93FdZIz0XxoiADg";
    }

    function makeStorageClient() {
      return new Web3Storage({ token: getAccessToken() });
    }

    async function storeFiles(files) {
      const client = makeStorageClient();
      const cid = await client.put(files);
      console.log("cid : " + cid);
      alert("File Uploaded Successfully! CID is " + cid);
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
      <Button
        variant="contained"
        size="small"
        type="submit"
        onClick={handleSubmission}
      >
        <CloudUploadIcon />
      </Button>
    </div>
  );
}

export default FileUploadPage;
