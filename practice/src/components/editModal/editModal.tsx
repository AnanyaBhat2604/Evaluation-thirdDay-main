import "./editModal.css";
import { useState, useEffect } from "react";

const EditModal = (props: any) => {
  const [edit, setEdit] = useState(false);

  const [value, setValue] = useState({
    siteName: "",
    url: "",
    sector: "",
    userName: "",
    sitePassword: "",
    notes: "",
    icon: "",
  });

  const [input, setInput] = useState<any>("");

  const previousSites = localStorage.getItem("currentUser") || "[]";
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
  const previousData = JSON.parse(localStorage.getItem(currentUser) || "[]");
  console.log("previousData", previousData);

  const [close, setClose] = useState(true);

  useEffect(() => {
    props.modalActive(close);
  });

  const editHandler = (e: any, i: number) => {
    e.preventDefault();

    const siteData = {
      siteName: e.target.siteName.value,
      url: e.target.url.value,
      sector: e.target.sector.value,
      userName: e.target.userName.value,
      sitePassword: e.target.sitePassword.value,
      notes: e.target.notes.value,
      icon: "",
    };

    console.log("site", siteData);

    if (
      siteData.siteName !== "" &&
      siteData.url !== "" &&
      siteData.userName !== "" &&
      siteData.sitePassword !== "" &&
      siteData.sector !== ""
    ) {
      previousData[i] = siteData;
      // console.log('P', previousData);
      const temp = localStorage.setItem(
        currentUser,
        JSON.stringify(previousData)
      );

      window.location.reload();
    } else {
      alert("Please enter all the required fields");
    }
  };

  console.log("currenttt", previousData);
  console.log("siteData", props.index);

  const changeHandler = (e: any) => {
    setInput(e.target.value);
  };

  return (
    <div className="modalBody">
      {/* {previousData.map((user: any, index: number) => { */}
      {/* <div className="modalMobileTopbar"></div> */}
      <div className="overlay">
        {" "}
        <div className="modal-content">
          <div className="modalEditHeader">
            <div className="modalTitle">Site Details</div>
            {/* <div className="modalButtons"> */}
          </div>
          {/* </div> */}
          <form
            onSubmit={(e) => {
              editHandler(e, props.index);
            }}
          >
            {/* <form> */}
            <div className="modalBodyForm">
              <div className="modalInput occupy">
                <div>URL</div>
                <input
                  type="text"
                  name="url"
                  onChange={changeHandler}
                  value={edit ? input.url : previousData[props.index].url}
                  className="modalInputBar"
                  // value={
                  //     edit ? value.url : previousData[index].url}
                />
              </div>
              <div className="modalInput">
                <div>Site Name</div>
                <input
                  type="text"
                  name="siteName"
                  className="modalInputBar"
                  value={
                    !edit ? previousData[props.index].siteName : input.siteName
                  }
                  onChange={changeHandler}
                />
              </div>
              <div className="modalInput">
                <div>Sector/Folder</div>
                <select
                  name="sector"
                  className="modalInputBar"
                  onChange={changeHandler}
                  value={
                    !edit ? previousData[props.index].siteName : input.siteName
                  }
                >
                  {" "}
                  <option value="Social Media">Social Media</option>
                  <option value="Finance">Finance</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div className="modalInput">
                <div>User Name</div>
                <input
                  type="text"
                  name="userName"
                  className="modalInputBar"
                  onChange={changeHandler}
                  value={
                    !edit ? previousData[props.index].userName : input.userName
                  }
                  // value={
                  //     edit ? value.userName : previousData[index].userName}
                />
              </div>
              <div className="modalInput">
                <div>Site Password</div>
                <div className="paswordEyeContainer">
                  <input
                    type="text"
                    name="sitePassword"
                    className="modalInputBar"
                    onChange={changeHandler}
                    value={
                      !edit
                        ? previousData[props.index].sitePassword
                        : input.sitePassword
                    }
                  />
                  <img
                    src={require("../../assets/images/eye_on.png")}
                    alt="eye"
                    className="passwordEye"
                  />
                </div>
              </div>
              <div className="modalInput occupy">
                <div>Notes</div>
                <textarea
                  className="modalInputBar"
                  name="notes"
                  onChange={changeHandler}
                  value={!edit ? previousData[props.index].notes : input.notes}
                />
              </div>
            </div>
            {!edit ? (
              <div>
                {!edit ? (
                  <div className="modalButtons">
                    <button
                      type="button"
                      onClick={() => setEdit(true)}
                      className="modalButton modalSaveButton"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}

            {edit ? (
              <input type="submit" value="save" className="btnSubmit" />
            ) : (
              ""
            )}
          </form>
          <div className="closeButton">
            <button
              onClick={() => {
                setClose(false);
              }}
              className="close"
            >
              <img
                src={require("../../assets/images/close_button.png")}
                alt="close"
              />
            </button>
          </div>
        </div>
      </div>
      {/* })}; */}
    </div>
  );
};

export default EditModal;
