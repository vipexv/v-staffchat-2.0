// React
import React, { useEffect, useRef, useState } from "react";

// CSS
import "../App.css";

// Cool :o
// import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";
// import { useNuiEvent } from "../hooks/useNuiEvent";
// import { isEnvBrowser } from "../utils/misc";
import { motion } from "framer-motion";

// Icons
import { MessagesSquare, Send } from "lucide-react";

// Mantine
import { Button, ScrollArea, TextInput } from "@mantine/core";
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
  const [suggestionsVisibility, setSuggestionsVisibility] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState("");
  const scrollViewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    scrollViewport.current!.scrollTo({
      top: scrollViewport.current!.scrollHeight,
      behavior: "smooth",
    });
  };

  const clearFunction = () => {
    fetchNui("staffchat:nui:cb:clear");
    setMessageData(initialMessageData);
    setSuggestionsVisibility(false);
    setTimeout(scrollToBottom, 100);
  };

  const imageFunction = async () => {
    const inputValue = messageData.inputData.slice(1);
    const messageArray = inputValue.split(" ");
    const response = await fetch(messageArray[1]);

    if (!response.ok) {
      notifications.show({
        title: "Error",
        message: `Image link is either invalid or not supported!`,
        icon: <Send size={16} />,
      });
      setMessageData(initialMessageData);
      setSuggestionsVisibility(false);
      setTimeout(scrollToBottom, 100);
      return;
    }
    fetchNui("staffchat:nui:cb:firemessage", messageData);
    setMessageData(initialMessageData);
    setSuggestionsVisibility(false);
    setTimeout(scrollToBottom, 100);
  };

  const commands = [
    {
      name: "clear",
      description: "Clear all of the current messages.",
      function: clearFunction,
    },
    {
      name: "image",
      description: "Send an image, ex: /image (image_url)",
      function: imageFunction,
    },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (messageData.inputData.startsWith("/")) {
      for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        const inputValue = messageData.inputData.substring(1).toLowerCase();

        if (inputValue.startsWith(command.name)) {
          command.function();
        }
      }
      return;
    }

    fetchNui("staffchat:nui:cb:firemessage", messageData);
    setTimeout(scrollToBottom, 100);
    setMessageData(initialMessageData);
    setSuggestionsVisibility(false);
  };

  return (
    <>
      <div className="w-[46dvh] h-[46dvh] flex flex-col items-start justify-end">
        <div
          className={`flex flex-col w-full gap-2 h-full rounded ${
            userSettings.theme === "default" ? "bg-[#1a1a1a]" : "bg-[#2a2a2a]"
          } bg-opacity-50 border-[#1a1a1a]`}
        >
          <ScrollArea
            viewportRef={scrollViewport}
            type="auto"
            h={430}
            scrollbarSize={8}
            scrollHideDelay={0}
          >
            {Object.values(messages).map((message: Message, index: number) => {
              const isSource =
                sourceData.id.toString() === message.adminData?.id?.toString();

              const isImageCommand = message.inputData.startsWith("/image");
              const commandInfo = {
                imageUrl: "",
                renderImage: false,
              };

              if (isImageCommand) {
                message.inputData.slice(1);
                const messageArray = message.inputData.split(" ");
                const image = messageArray[1];
                if (image) {
                  commandInfo.renderImage = true;
                  commandInfo.imageUrl = image;
                }
              }

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
                    {!commandInfo.renderImage ? (
                      <>
                        <p
                          className={`rounded-[2px] p-1 max-w-[250px] whitespace-break-spaces break-words ${
                            isSource ? "bg-[#383838]" : "bg-cyan-400"
                          }`}
                        >
                          {message.inputData}
                        </p>
                      </>
                    ) : (
                      <img
                        src={commandInfo.imageUrl}
                        alt="Image"
                        className={`max-w-[150px] rounded cursor-pointer ${
                          imageModalOpen ? "blur-sm" : ""
                        }`}
                        onClick={(e) => {
                          if (imageModalOpen) {
                            setImageModalUrl("");
                            setImageModalOpen(false);
                            return;
                          }

                          setImageModalUrl(commandInfo.imageUrl);
                          setImageModalOpen(true);
                        }}
                      />
                    )}
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
          <div className="flex flex-col justify-center items-center w-full">
            {!!suggestionsVisibility && (
              <>
                <div
                  className={`${
                    userSettings.theme === "default"
                      ? "bg-[#1a1a1a]"
                      : "bg-[#2a2a2a]"
                  } absolute mb-52 font-inter rounded-[2px] p-2 w-[30dvh]"`}
                >
                  <div className="flex flex-col justify-center gap-2 text-sm">
                    <p>Available Commands</p>
                    {commands.map((value, index) => {
                      return (
                        <>
                          <div>
                            <p>/{value.name}</p>
                            <p className="text-xs opacity-50">
                              {value.description}
                            </p>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            <TextInput
              className={`rounded w-full p-1 text-white font-inter font-semibold transition`}
              leftSection={<MessagesSquare size={16} />}
              placeholder="Input a message"
              value={messageData.inputData}
              onChange={(e) => {
                const value = e.target.value;
                setMessageData({
                  ...messageData,
                  inputData: value,
                });
                setSuggestionsVisibility(value.startsWith("/"));
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
          </div>
          <Button type="submit" disabled={!messageData.inputData.length}>
            <Send size={14} />
          </Button>
        </form>
        {/* </form> */}
      </div>
      {!!imageModalOpen && (
        <>
          <motion.div
            className="fixed top-0 left-0 flex justify-center items-center h-full w-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <img
              src={imageModalUrl}
              alt="Image"
              className="rounded max-w-[90%]"
              onClick={(e) => {
                setImageModalOpen(false);
                setImageModalUrl("");
              }}
            />
          </motion.div>
        </>
      )}
    </>
  );
};

export default ChatTab;
