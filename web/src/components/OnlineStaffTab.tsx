// React
import React, { useState, useEffect } from "react";

// CSS
import "../App.css";

// Cool :o
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { isEnvBrowser } from "../utils/misc";
import { User } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  staffMembers: StaffMember[];
  userSettings: any;
}

interface Message {
  adminData: StaffMember;
  inputData: string;
  date_time: string;
}

interface StaffMember {
  id: string | number;
  name: string;
  // Unused but it's in there.
  isStaff: boolean;
}

const OnlineStaffTab: React.FC<Props> = ({ staffMembers, userSettings }) => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <>
      <div
        className={`w-[55dvh] h-[44dvh] ${
          userSettings.theme === "default" ? "bg-[#1a1a1a]" : "bg-[#2a2a2a]"
        } rounded bg-opacity-50 transition`}
      >
        <motion.div
          className="grid grid-cols-4 gap-40 w-full overflow-y-scroll"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {Object.values(staffMembers).map(
            (staff: StaffMember, index: number) => {
              if (!staff) return;
              return (
                <motion.div
                  className={`${
                    userSettings.theme === "default"
                      ? "bg-[#1a1a1a]"
                      : "bg-[#2a2a2a]"
                  } rounded px-2 py-2 w-full min-w-[150px] font-semibold m-3 flex items-center justify-between text-xs`}
                  key={index}
                  variants={item}
                >
                  <p className="flex justify-center items-center">
                    <User size={"16px"} className="mr-2" /> {staff.name}
                  </p>

                  <p className="bg-blue-500 rounded p-1">ID: {staff.id}</p>
                </motion.div>
              );
            }
          )}
        </motion.div>
      </div>
    </>
  );
};

export default OnlineStaffTab;
