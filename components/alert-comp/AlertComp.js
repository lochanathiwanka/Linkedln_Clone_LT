import React from "react"
import {
    Alert,
    Box,
    Center,
    CloseIcon,
    Collapse,
    HStack,
    IconButton,
    NativeBaseProvider,
    Text,
    VStack,
} from "native-base"
import {useDispatch} from "react-redux";
import {setIsError} from "../../screens/root-stack-screen/root-stacks/sign-in-screen/redux/signInAction";

export function AlertComp({title, message, status}) {
    const [show, setShow] = React.useState(true);

    // dispatcher
    const dispatch = useDispatch();

    return (
        <Box w="100%" style={{position: 'absolute', top: 0}}>
            <Collapse isOpen={show}>
                <Alert w="100%" status={status} colorScheme={status}>
                    <VStack space={1} flexShrink={1} w="100%">
                        <HStack
                            flexShrink={1}
                            space={2}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <HStack flexShrink={1} space={2} alignItems="center">
                                <Alert.Icon />
                                <Text
                                    fontSize="md"
                                    fontWeight="medium"
                                    _dark={{
                                        color: "coolGray.800",
                                    }}
                                >
                                    {title}
                                </Text>
                            </HStack>
                            <IconButton
                                variant="unstyled"
                                icon={<CloseIcon size="3" color="coolGray.600" />}
                                onPress={() => {
                                    setShow(false);
                                    dispatch(setIsError(false));
                                }}
                            />
                        </HStack>
                        <Box
                            pl="6"
                            _dark={{
                                _text: {
                                    color: "coolGray.600",
                                },
                            }}
                        >
                            {message}
                        </Box>
                    </VStack>
                </Alert>
            </Collapse>
        </Box>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <AlertComp />
            </Center>
        </NativeBaseProvider>
    )
}
