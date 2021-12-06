import React from "react";
import {Avatar, Center, HStack, NativeBaseProvider} from "native-base";

export const AvatarComp = ({imageURL}) => {
    return (
        <HStack space={2}>
            <Avatar
                bg="amber.500"
                size="sm"
                source={{
                    uri: imageURL ? imageURL : 'https://i.ibb.co/1ZgVv1F/356-3562377-personal-user.png',
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
