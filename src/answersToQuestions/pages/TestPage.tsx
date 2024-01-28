import { DraggableItem } from 'src/shared/ui/Kit/Draggable/Draggable';
import { useState } from 'react';
import SwapModeList from 'src/shared/ui/Kit/SwapList/ui/SwapModeList/SwapModeList';

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
                list={list}
                direction={!dir ? 'row' : 'column'}
                gap={8}
                onBlur={(v) => {
                    setList(v);
                }}
                onChange={(v) => {
                    console.log(v);
                }}
            >
                {(item) => (
                    <DraggableItem>
                        {item}
                    </DraggableItem>
                )}
            </SwapModeList>
        </>
    );
};

export default TestPage;
