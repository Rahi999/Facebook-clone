import React, { useState } from "react";
import { Tabs, Tab, TabPanels, TabPanel, TabList, Box } from "@chakra-ui/react";
import { AiFillHome, AiOutlineUsergroupAdd, AiFillYoutube, AiFillShop, AiFillPlayCircle } from 'react-icons/ai';
import Posts from "../Pages/Posts";

const FbTabs = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (index) => {
        setCurrentTab(index);
    };
    return (
        <>
            <Tabs ml={{ base: 10, md: 0 }} >
                <TabList gap="1%" display={{ base: 'none', sm: "flex", md: 'flex', lg: "flex", xl: "flex" }} p="5">
                    <Tab title="Home"><AiFillHome size={27} /></Tab>
                    <Tab title="Friends & Group"><AiOutlineUsergroupAdd size={27} /></Tab>
                    <Tab title="Story"><AiFillYoutube size={27} /></Tab>
                    <Tab title="Story"><AiFillShop size={27} /></Tab>
                    <Tab title=""> <AiFillPlayCircle size={27} /></Tab>
                </TabList>

                <TabPanels mt={{ base: "30%", sm: "5%", md: "5%", lg: "0", xl: "0" }}>
                    <TabPanel width={{base: "100%", sm: "100%", md: "70%", lg: "55%", xl: "55%"}}
                    marginLeft={{base: "-10", sm: "-10", md:"0", lg: "0", xl: "0"}} position="relative"
                    >
                        <Posts />
                        
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Four!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Five!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>


        </>
    )
}
export default FbTabs