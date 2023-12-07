// React
import React, { useState, useEffect } from "react";

// CSS
import "../App.css";

// Cool :o
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { isEnvBrowser } from "../utils/misc";
import { motion } from "framer-motion";

// Mantine
import { SegmentedControl, Switch } from "@mantine/core";
import { Bell, BellOff, Palette } from "lucide-react";

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

interface Settings {
  theme: "default" | "darkplus";
  notifications: boolean;
}

interface Props {
  userSettings: any;
}

const SettingsTab: React.FC<Props> = ({ userSettings }) => {
  const [globalSettings, setGlobalSettings] = useState<Settings>(userSettings);

  useEffect(() => {
    fetchNui("staffchat:nui:cb:settings", globalSettings);
  }, [globalSettings]);
  return (
    <>
      <div className="w-[55dvh] h-[44dvh] bg-[#2a2a2a] rounded bg-opacity-50 font-inter">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="flex flex-col justify-center items-center mt-10">
            <p className="font-bold font-horizon bg-[#1a1a1a] rounded px-2 py-1 bg-opacity-50 border border-[#1a1a1a]">
              Theme
            </p>
            <SegmentedControl
              value={globalSettings.theme}
              onChange={(e) => {
                setGlobalSettings({
                  ...globalSettings,
                  theme: e as Settings["theme"],
                });
              }}
              // color=""
              className="mt-10"
              data={[
                {
                  label: (
                    <div className="flex justify-center items-center">
                      <Palette size={"16px"} className="mr-1" />
                      <span>Default</span>
                    </div>
                  ),
                  value: "default",
                },
                {
                  label: (
                    <div className="flex justify-center items-center">
                      <Palette size={"16px"} className="mr-1" />
                      <span>Dark +</span>
                    </div>
                  ),
                  value: "darkplus",
                },
              ]}
            />
          </div>
          <div className="flex flex-col justify-center items-center mt-10">
            <p className="font-bold mb-2 font-horizon bg-[#1a1a1a] rounded px-2 py-1 bg-opacity-50 border border-[#1a1a1a]">
              Settings
            </p>
            <div className="flex flex-col justify-center items-center mt-5">
              <div className="flex items-center justify-between font-inter p-2 rounded bg-[#242424]">
                <Switch
                  defaultChecked
                  checked={globalSettings.notifications}
                  className="font-inter font-semibold text-base"
                  onChange={(e) => {
                    setGlobalSettings({
                      ...globalSettings,
                      notifications: e.currentTarget.checked,
                    });
                  }}
                  labelPosition="left"
                  onLabel={<Bell size={14} />}
                  offLabel={<BellOff size={14} />}
                  label="Notifications"
                  radius="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsTab;
