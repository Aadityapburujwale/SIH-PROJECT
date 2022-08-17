// package to convert app into web 3
import { ethers } from "ethers";

// contract essentials
import ContractAddress from "./config";
import Abi from "./Crimes.json";

let Contract;

function CreateContract() {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Metamask Not Found");
      return;
    }
    // hold the user currently logged in
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    Contract = new ethers.Contract(ContractAddress, Abi.abi, signer);
  } catch (error) {
    console.log(error);
  }
}

CreateContract();

export default Contract;
