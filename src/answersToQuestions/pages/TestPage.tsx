import { DraggableItem } from 'src/shared/ui/Kit/Draggable/Draggable';
import { useState } from 'react';
import SwapModeList from 'src/shared/ui/Kit/SwapList/ui/SwapModeList/SwapModeList';
import Input from 'src/shared/ui/Kit/Input/Input';

interface TestPageProps {

}

const TestPage = (props: TestPageProps) => {
    const {

    } = props;

    const [list, setList] = useState(Array(4).fill().map((_, i) => i));
    const [dir, setDir] = useState(true);

    return (
        <>
            <button onClick={() => setDir(!dir)}>dsfsfd</button>
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
            </div>

        </>
    );
};

export default TestPage;