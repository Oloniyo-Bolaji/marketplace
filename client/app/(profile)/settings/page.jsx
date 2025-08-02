"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import SettingsInput from "@/components/SettingsInput";

const style = {
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translateX(-50%)",
  width: 400,
  bgcolor: "#fff",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const page = () => {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const [currentProp, setCurrentProp] = useState("");
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [detail, setDetail] = useState("");

  const handleClose = () => setOpen(false);

  const handleOpen = ({ prop, placeholder, propDetail }) => {
    setCurrentProp(prop);
    setCurrentPlaceholder(placeholder);
    setDetail(propDetail);
    setOpen(true);
  };

  const [userDetails, setUserDetails] = useState();
  useEffect(() => {
    const getUserDetails = async () => {
      if (user?.user?.id) {
        const res = await fetch(`/api/user/${user?.user?.id}`);
        const result = await res.json();
        setUserDetails(result.data);
      }
    };

    getUserDetails();
  }, [user]);

  let accountNumber = "-";
  let fullName = "-";
  let bankName = "-";

  if (userDetails?.bankAccount) {
    const parts = userDetails.bankAccount.split(",").map((p) => p.trim());
    if (parts.length === 3) {
      [accountNumber, fullName, bankName] = parts;
    } else {
      console.warn("Invalid bankAccount format:", userDetails.bankAccount);
    }
  }

  const handleSubmit = async (inputValue) => {
    try {
      const res = await fetch(`/api/user/${user?.user?.id}/${propDetail}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: inputValue,
        }),
      });
      const result = await res.json();
      if (result.success) {
        alert("profile edited successfully!");
        setInputValue("")
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Application Error:", err);
      alert("Error updating profile");
    }
  };
  
  return (
    <div className="w-full bg-white/20  shadow-lg backdrop-blur-sm border border-white/30 rounded-[10px] text-[14px]">
      <div className="setting">
        <div>
          <h2>Username</h2>
        </div>
        <div className="detail ">
          <span>{userDetails?.username}</span>
          <button
            onClick={() => {
              handleOpen({
                prop: userDetails?.username,
                placeholder: "",
                propDetail: "username",
              });
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className="setting">
        <div>
          <h2>Location</h2>
        </div>
        <div className="detail">
          <span>{userDetails?.location ? userDetails.location : "-"}</span>
          <button
            onClick={() => {
              handleOpen({
                prop: userDetails?.location,
                placeholder: "",
                propDetail: "location",
              });
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className="setting">
        <div>
          <h2>Bank Details</h2>
        </div>
        <div className="detail">
          <div className="flex flex-row gap-[5px] text-[12px] text-[#888]">
            <span>{accountNumber}</span>
            <span>{fullName}</span>
            <span>{bankName}</span>
          </div>
          <button
            onClick={() => {
              handleOpen({
                prop: userDetails?.bankAccount,
                placeholder: "0012290881, John Doe, Tull Bank",
                propDetail: "bankAccount",
              });
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className="setting">
        <div>
          <h2>Phone No</h2>
        </div>
        <div className="detail">
          <span>
            {userDetails?.phoneNumber ? userDetails.phoneNumber : "-"}
          </span>
          <button
            onClick={() => {
              handleOpen({
                prop: userDetails?.phoneNumber,
                placeholder: "",
                propDetail: "phoneNumber",
              });
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className="setting">
        <div>
          <h2>Address</h2>
        </div>
        <div className="detail">
          <span>{userDetails?.address ? userDetails.address : "-"}</span>
          <button
            onClick={() => {
              handleOpen({
                prop: userDetails?.address,
                placeholder: "",
                propDetail: "address",
              });
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <div className="setting">
        <div>
          <h2>Artisan?  What do you do?</h2>
        </div>
        <div className="detail">
          <span>{userDetails?.artisan ? userDetails.artisan : "-"}</span>
          <button
            onClick={() => {
              handleOpen({
                prop: userDetails?.artisan,
                placeholder: "",
                propDetail: "artisan",
              });
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <SettingsInput
              prop={currentProp}
              placeholder={currentPlaceholder}
              propDetail={detail}
              open={open}
              setOpen={setOpen}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default page;
