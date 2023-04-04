import React from "react";
import "./UserPanel.scss";
import UserInput from "./UserInput";

const UserPanel = () => {
  return (
    <div className="userPanel-main">
        <div className='userPanel-firstItem'>
          TODO - Request Parameters
        </div>
        <div className="userPanel-secondItem">
          <UserInput />
        </div>
    </div>
  );

};

export default UserPanel;
