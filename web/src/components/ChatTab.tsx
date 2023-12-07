// React
import React, { useState, useEffect, useRef, FormEventHandler } from "react";

// CSS
import "../App.css";

// Cool :o
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { isEnvBrowser } from "../utils/misc";
import { motion } from "framer-motion";

// Icons
import { Info, MessagesSquare, Send } from "lucide-react";

// Mantine
import { Button, TextInput, ScrollArea } from "@mantine/core";
import { notifications } from "@mantine/notifications";

interface Props {
  messages: Message[];
  sourceData: any;
  userSettings: any;
}

interface Message {
  adminData?: StaffMember;
  inputData: string;
  date_time: string;
}

interface StaffMember {
  id: string | number;
  name: string;
  // Unused but it's in there.
  isStaff: boolean;
}

const initialMessageData: Message = {
  inputData: "",
  date_time: "N/A",
};
const ChatTab: React.FC<Props> = ({ messages, sourceData, userSettings }) => {
  const [messageData, setMessageData] = useState<Message>(initialMessageData);

  const scrollViewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollViewport.current!.scrollTo({
      top: scrollViewport.current!.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchNui("staffchat:nui:cb:firemessage", messageData);
    setTimeout(scrollToBottom, 100);
    setMessageData(initialMessageData);
  };
  const containerVariants = {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  };

  return (
    <>
      <div className="w-[44dvh] h-[44dvh] flex flex-col items-start justify-end">
        {/* <form
          onSubmit={() => {
            console.log("submitted");
          }}
        > */}
        <div className="flex flex-col w-full gap-2 h-full rounded bg-[#1a1a1a] bg-opacity-50 border-[#1a1a1a]">
          <ScrollArea
            viewportRef={scrollViewport}
            type="auto"
            h={430}
            scrollbarSize={8}
            scrollHideDelay={0}
          >
            {Object.values(messages).map((message: Message, index: number) => {
              const isSource =
                sourceData.id.toString() === message.adminData?.id.toString();
              return (
                <>
                  <motion.div
                    key={index}
                    className={`flex flex-col font-medium text-sm m-2 ${
                      isSource ? "items-end" : "items-start"
                    }`}
                  >
                    <span className="mb-1 text-xs">
                      {message.adminData?.name}
                    </span>
                    <p
                      className={`rounded-[2px] p-1 max-w-[250px] whitespace-break-spaces break-words ${
                        isSource ? "bg-[#383838]" : "bg-cyan-400"
                      }`}
                      // style={{
                      //   overflowWrap: "break-word",
                      // }}
                    >
                      {message.inputData}
                    </p>
                  </motion.div>
                </>
              );
            })}
          </ScrollArea>
        </div>
        <form
          className="flex items-center justify-evenly w-full"
          onSubmit={handleSubmit}
        >
          <TextInput
            className={`rounded w-full p-1 text-white font-inter font-semibold transition`}
            leftSection={<MessagesSquare size={16} />}
            placeholder="Input a message"
            value={messageData.inputData}
            onChange={(e) => {
              setMessageData({
                ...messageData,
                inputData: e.target.value,
              });
            }}
            styles={{
              input: {
                backgroundColor:
                  userSettings.theme === "default" ? "#1a1a1a" : "#2a2a2a",
                border: "none",
                color: "white",
              },
            }}
          />
          <Button type="submit" disabled={!messageData.inputData.length}>
            <Send size={14} />
          </Button>
        </form>
        {/* </form> */}
      </div>
    </>
  );
};

export default ChatTab;
