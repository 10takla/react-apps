import { useState, useEffect } from 'react';
import Input from "S/ui/Kit/Input/Input";
import InputRange from "S/ui/Kit/Input/ui/InputRange/InputRange";
import { VStack } from "S/ui/Stack";

interface TestPageProps {

}

const TestPage = (props: TestPageProps) => {
    const {

    } = props;

    const [list, setList] = useState(Array(4).fill().map((_, i) => i));
    const [dir, setDir] = useState(true);

    const [value, setValue] = useState();

    useEffect(() => {
        const i = 0;
        // const interval = setInterval(() => {
        //     setValue((pre) => `${pre}s`);
        //     i += 1;
        //     if (i === 10) {
        //         clearInterval(interval);
        //     }
        // }, 1000);
    }, []);
    return (
        <>
            <VStack style={{
                // background: 'red',
                padding: 10,
                width: 200,
                height: 200,
            }}
            >
                <Input
                    min={10}
                    max={100}
                    type="number"
                    value={-120}
                    onChange={(e) => console.log('change', e.target.value)}
                    onBlur={(e) => console.log('blur', e.target.value)}
                />
                <InputRange
                    min={10}
                    // direction="y"
                    // max={100}
                    values={[-20]}
                    // step={5}
                    onChange={(v) => {
                        // console.log(v);
                    }}
                />
            </VStack>
            {/* <button onClick={() => setDir(!dir)}>dsfsfd</button> */}
            {/* <SwapModeList
                mode="offset"
                list={list}
                direction={dir ? 'row' : 'column'}
                gap={8}
                onBlur={(v) => {
                    setList(v);
                }}
                onChange={(v) => {
                    // console.log(v);
                }}
            >
                {(item) => (
                    <DraggableItem>
                        {10 ** item}
                    </DraggableItem>
                )}
            </SwapModeList> */}
            {/* <div style={{ width: 100, background: 'red', padding: 10 }}>
                <Input
                    type="textarea"
                    style={{ maxWidth: '100%' }}
                />
            </div> */}
        </>
    );
};

export default TestPage;
