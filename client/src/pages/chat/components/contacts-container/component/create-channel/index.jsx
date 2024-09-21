import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  import Select from 'react-select';
  import { useState } from "react";
  import { FaPlus } from "react-icons/fa";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
//   import Lottie from "react-lottie";
//   import { animationDefaultOptions } from "@/lib/utils";
  import { apiClient } from "@/lib/api-client";
  import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
//   import { ScrollArea } from "@/components/ui/scroll-area";
  import { Avatar, AvatarImage } from "@/components/ui/avatar";
  import { HOST } from "@/utils/constants";
//   import { getColor } from "@/lib/utils";
  import { useAppStore } from "@/store";
  
  const CreateChannel = () => {
    const { setSelectedChatType, setSelectedChatData } = useAppStore();
    
    const [openNewContactModal, setOpenNewContactModal] = useState(false);
  
    const [searchedContacts, setSearchedContacts] = useState([]);
  
    const searchContacts = async (searchTerm) => {
      try {
        if (searchTerm.length > 0) {
          const response = await apiClient.post(
            SEARCH_CONTACTS_ROUTES,
            { searchTerm },
            { withCredentials: true }
          );
          if (response.status === 200 && response.data.contacts) {
            setSearchedContacts(response.data.contacts);
          } else {
            setSearchedContacts([]);
          }
        }
      } catch (error) {
        console.log({ error });
      }
    };
  
    const selectNewContact = (contact) => {
      setOpenNewContactModal(false);
      setSelectedChatType("contact");
      setSelectedChatData(contact);
      setSearchedContacts([]);
    };

    const formatContactOptions = () => {
        return searchedContacts.map(contact => ({
          value: contact.id,
          label: contact.name,
          avatar: `${HOST}/path/to/avatar/${contact.avatar}`
        }));
      };
  
    return (
      <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FaPlus
                className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300 "
                onClick={() => setOpenNewContactModal(true)}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1a] border-none mb-2 p-3 text-white">
              Select New Contact
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
          <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col ">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-start">Fill the details for  creating new Channel</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div>
              <Input
                placeholder="Search Contacts"
                className="rounded-lg mb-5 p-6 bg-[#2c2e3b] border-none text-white"
                // onChange={(e) => searchContacts(e.target.value)}
              />
              <Select
              isMulti
              options={formatContactOptions()}
              placeholder="Search Contacts"
              className="rounded-lg mb-5 p-1 bg-[#2c2e3b] border-none text-white"
              onInputChange={searchContacts}
              onChange={selectNewContact}
              formatOptionLabel={({ label, avatar }) => (
                <div className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage src={avatar} alt={label} />
                  </Avatar>
                  {label}
                </div>
              )}
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#2c2e3b',
                  borderColor: 'transparent',
                  color: 'white',
                }),
                input: (base) => ({
                  ...base,
                  color: 'white',
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: '#2c2e3b',
                  color: 'white',
                }),
              }}
            />
            </div>
            <div>
            <button className=" h-10 w-full rounded-lg bg-purple-700 hover:bg-purple-700 transition-all duration-300 ">
                create channel
            </button>
            </div>
            {/* {searchedContacts.length > 0 && (
              <ScrollArea className="h-[250px]">
                <div className="flex flex-col gap-5">
                  {searchedContacts.map((contact) => (
                    <div
                      key={contact._id}
                      className="flex gap-3 items-center cursor-pointer"
                      onClick={() => selectNewContact(contact)}
                    >
                      <div className="w-12 h-12 relative">
                        <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                          {contact.image ? (
                            <AvatarImage
                              src={`${HOST}/${contact.image}`}
                              alt="profile"
                              className="object-cover w-full h-full bg-black rounded-full"
                            />
                          ) : (
                            <div
                              className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                                contact.color
                              )}`}
                            >
                              {" "}
                              {contact.firstName
                                ? contact.firstName.split("").shift()
                                : contact.email.split("").shift()}
                            </div>
                          )}
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <span>
                          {contact.firstName && contact.lastName
                            ? `${contact.firstName} ${contact.lastName}`
                            : contact.email}
                        </span>
                        <span className="text-xs">{contact.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )} */}
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default CreateChannel;
  