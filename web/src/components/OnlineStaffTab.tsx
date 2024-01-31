import { User } from "lucide-react";
import "../App.css";
import { ScrollArea } from "@mantine/core";

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
  isStaff: boolean;
}

const OnlineStaffTab: React.FC<Props> = ({ staffMembers, userSettings }) => {
  return (
    <>
      <div
        className={`w-[46dvh] h-[46dvh] ${
          userSettings.theme === "default" ? "bg-[#1a1a1a]" : "bg-[#2a2a2a]"
        } rounded bg-opacity-50 transition`}
      >
        <ScrollArea h={500}>
          <div className=" m-1 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.values(staffMembers).map(
              (staff: StaffMember, index: number) => {
                if (!staff) return;
                console.log(index);
                return (
                  <div
                    className={`rounded-[2px] text-xs flex justify-between px-2 py-1 ${
                      userSettings.theme === "default"
                        ? "bg-[#1a1a1a]"
                        : "bg-[#2a2a2a]"
                    }`}
                    key={index}
                  >
                    <p className="flex justify-center items-center">
                      {staff.name}
                    </p>

                    <p className="bg-blue-500 rounded-[2px] p-1 text-xs font-main text-opacity-50 font-medium">
                      ID: {staff.id}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default OnlineStaffTab;
