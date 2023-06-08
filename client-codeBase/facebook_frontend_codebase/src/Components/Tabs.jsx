import React, { useState } from "react";
import { Tabs, Tab, TabPanels, TabPanel, TabList, Box } from "@chakra-ui/react";
import { AiFillHome, AiOutlineUsergroupAdd, AiFillYoutube, AiFillShop, AiFillPlayCircle } from 'react-icons/ai';

const FbTabs = () => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (index) => {
        setCurrentTab(index);
    };
    return (
        <>
            <Tabs ml={{ base: 10, md: 0 }} display={{ base: 'none', md: 'none', lg: "block", xl: "block" }} width={{ base: "", md: "70%" }}>
                <TabList gap="5">
                    <Tab title="Home"><AiFillHome size={27} /></Tab>
                    <Tab title="Friends & Group"><AiOutlineUsergroupAdd /></Tab>
                    <Tab title="Story"><AiFillYoutube size={27} /></Tab>
                    <Tab title="Story"><AiFillShop size={27} /></Tab>
                    <Tab title=""> <AiFillPlayCircle size={27} /></Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
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