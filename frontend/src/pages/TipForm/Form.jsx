// react module , hooks
import React from "react";

// import contract through which we can communicate to the blockchain
import Contract from "../../Contract";

export default function Form() {
  // submitTip is a function which trigger when user clicks on a submit button of a form

  const submitTip = async (e) => {
    e.preventDefault();

    try {
      Contract.submitCrime(
        111,
        "Bambhori",
        98765,
        98765,
        "Money stolen",
        5,
        "from bambhori",
        0,
        "NA",
        0,
        "NA"
      )
        .then(() => {
          alert("Tip Submitted successfully anonymously");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return <h1>Form To Take Tipps</h1>;
}

// create a new component in which this fields are accepted or create function here as submit tip and make fields that are not inserted as null

// Tips.defaultProps = {
//   here we can the fields if the fields are not specified
// };
