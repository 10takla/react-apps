import { useState, useEffect } from 'react';
import Input from 'src/shared/ui/Kit/Input/Input';

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
            <div style={{
                background: 'red', padding: 10, width: 200,
            }}
            >
                <Input
                    // type="textarea"
                    value={value}
                    placeholder='dsffsdf'
                />
            </div>
            {/* <button onClick={() => setDir(!dir)}>dsfsfd</button>
            <SwapModeList
                mode="offset"
                type={undefined}
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
            </SwapModeList>
            <div style={{ width: 100, background: 'red', padding: 10 }}>
                <Input
                    type="textarea"
                    style={{ maxWidth: '100%' }}
                />
            </div> */}

        </>
    );
};

export default TestPage;
