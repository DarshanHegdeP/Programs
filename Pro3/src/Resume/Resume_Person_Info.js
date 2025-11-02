import React from "react";

class Resume_Person_Info extends React.Component {
  render() {
    return (
      <>
        <style>
          {`
            .id {
              display: inline-block;
              margin-right: 10px;
            }
          `}
        </style>

        <div>
          <div className="id">Name: <span className="id">Darshan Hegde</span></div><br />
          <div className="id">Address: <span className="id">Bangalore</span></div><br />
          <div className="id">Phone No: <span className="id">9242960768</span></div><br />
          <div className="id">Email ID: <span className="id">darshanhegde@gmail.com</span></div><br />
        </div>
      </>
    );
  }
}

export default Resume_Person_Info;
