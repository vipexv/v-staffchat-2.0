// React
import React, { useState, useEffect } from "react";

// CSS
import "./App.css";

// Cool :o
import { debugData } from "./utils/debugData";
import { fetchNui } from "./utils/fetchNui";
import { useNuiEvent } from "./hooks/useNuiEvent";
import { isEnvBrowser } from "./utils/misc";
import { motion } from "framer-motion";

// Mantine
import { Tabs, Transition } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Cog, Info, MessageSquare, Send, Users } from "lucide-react";
import ChatTab from "./components/ChatTab";
import OnlineStaffTab from "./components/OnlineStaffTab";
import SettingsTab from "./components/SettingsTab";

debugData([
  {
    action: "setVisible",
    data: true,
  },
]);

// debugData([
//   {
//     action: "staffchat:nui:firemessage",
//     data: {
//       adminData: {
//         id: 1,
//         name: "vipex",
//         isStaff: true,
//       },
//       date_time: "N/A",
//       inputData:
//         "/image https://cdn.discordapp.com/attachments/839129248265666589/1178613078653415475/image2_1.jpg?ex=65800277&is=656d8d77&hm=3df933ad893f02e8e6ce3d5b610ba23ea478809799cb951158038bd58f8b0549&",
//     },
//   },
// ]);

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
  theme: string;
  notifications: boolean;
}

const initialSettings: Settings = {
  theme: "default",
  notifications: true,
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [sourceData, setSourceData] = useState<StaffMember>({
    id: 0,
    name: "",
    isStaff: false,
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeStaff, setActiveStaff] = useState<StaffMember[]>([]);

  const [settings, setSettings] = useState<Settings>(initialSettings);

  debugData([
    {
      action: "staffchat:nui:admins",
      data: [
        { isStaff: true, name: "vipex", id: "1" },
        { isStaff: true, name: "vipex_2", id: "2" },
        { isStaff: true, name: "vipex", id: "3" },
        { isStaff: true, name: "vipex_2", id: "4" },
        { isStaff: true, name: "vipex", id: "5" },
        { isStaff: true, name: "vipex_2", id: "6" },
        { isStaff: true, name: "vipex", id: "7" },
        { isStaff: true, name: "vipex_2", id: "8" },
      ],
    },
  ]);

  useNuiEvent("staffchat:clear", () => {
    setMessages([]);
  });

  useNuiEvent<Settings>("staffchat:nui:settings", (psettings) => {
    setSettings(psettings);
  });

  useNuiEvent("staffchat:nui:notify", (info) => {
    if (!info) return;
    notifications.show({
      title: "Staffchat",
      message: info,
      icon: <Info size={"16px"} />,
    });
  });

  useNuiEvent("staffchat:nui:sourcedata", setSourceData);

  useNuiEvent<Message>("staffchat:nui:firemessage", (data) => {
    if (!data) return;

    setMessages([...messages, data]);

    if (!visible && settings.notifications) {
      notifications.show({
        title: "Staff Chat | New Message",
        message: `${data.adminData.name} [ID - ${data.adminData.id}] Sent a new message!`,
        icon: <Send size={16} />,
      });
    }
  });

  // useNuiEvent("staffchat:nui:admins", (staff: StaffMember[]) => {
  //   console.log(JSON.stringify(staff));
  // });

  useNuiEvent("staffchat:nui:admins", setActiveStaff);

  useNuiEvent<boolean>("setVisible", setVisible);

  useEffect(() => {
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (["Escape"].includes(e.code)) {
        if (!isEnvBrowser()) fetchNui("hideFrame");
        else setVisible(!visible);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible]);

  return (
    <>
      <Transition
        mounted={visible}
        duration={400}
        transition={"slide-up"}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles} className="absolute bottom-2 right-10">
            <Tabs
              color="dark"
              variant="pills"
              orientation="vertical"
              styles={{
                tab: {
                  transition: "0.4s",
                },
              }}
              className={` ${
                settings.theme === "default" ? "bg-[#2e2e2e]" : "bg-[#1a1a1a]"
              } transition text-white rounded p-2 border border-[#1a1a1a] flex flex-row gap-10`}
              defaultValue="chat"
            >
              <Tabs.List className="flex flex-col p-2 gap-2 font-bold">
                <Tabs.Tab
                  value="chat"
                  leftSection={<MessageSquare className="bg-blue" size={16} />}
                  className="p-1"
                >
                  Chat Tab
                </Tabs.Tab>
                <Tabs.Tab value="onlineStaff" leftSection={<Users size={16} />}>
                  Online Staff
                </Tabs.Tab>
                <Tabs.Tab value="settings" leftSection={<Cog size={16} />}>
                  Settings
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="chat">
                <ChatTab
                  messages={messages}
                  sourceData={sourceData}
                  userSettings={settings}
                />
              </Tabs.Panel>

              <Tabs.Panel value="onlineStaff">
                <OnlineStaffTab
                  staffMembers={activeStaff}
                  userSettings={settings}
                />
              </Tabs.Panel>

              <Tabs.Panel value="settings">
                <SettingsTab userSettings={settings} />
              </Tabs.Panel>
            </Tabs>
          </div>
        )}
      </Transition>
    </>
  );
};

export default App;
