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
            <Tabs ml={{ base: 10, md: 0 }}>
                <TabList gap="">
                    <Tab><AiFillHome /></Tab>
                    <Tab><AiOutlineUsergroupAdd /></Tab>
                    <Tab><AiFillYoutube /></Tab>
                    <Tab><AiFillShop /></Tab>
                    <Tab> <AiFillPlayCircle /></Tab>
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