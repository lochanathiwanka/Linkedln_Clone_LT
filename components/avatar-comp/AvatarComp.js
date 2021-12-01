import React from "react";
import {Avatar, Center, HStack, NativeBaseProvider} from "native-base";

export const AvatarComp = ({imageURL}) => {
    return (
        <HStack space={2}>
            <Avatar
                bg="amber.500"
                size="sm"
                source={{
                    uri: imageURL,
                }}
            >
                AK
            </Avatar>
        </HStack>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <AvatarComp />
            </Center>
        </NativeBaseProvider>
    )
}
