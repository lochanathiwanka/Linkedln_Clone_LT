import React, {useEffect, useState} from 'react';
import {NativeBaseProvider, Progress} from "native-base"

const ProgressBarLoader = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (value >=  100) {
                setValue(0);
            } else {
                setValue(value + 40);
            }
        }, 1500);
        return () => {
            clearInterval(interval);
        };
    });


    return (
        <NativeBaseProvider>
            <Progress colorScheme="#0e76a8" bg="gray.200" size="xs" style={{width: 150}} value={value} mx="4" />
        </NativeBaseProvider>
    );
};

export default ProgressBarLoader;

