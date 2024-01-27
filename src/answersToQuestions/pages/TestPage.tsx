import { DraggableItem } from 'src/shared/ui/Kit/Draggable/Draggable';
import SwapList from 'src/shared/ui/Kit/SwapList/SwapList';
import { useState } from 'react';

interface TestPageProps {

}

const TestPage = (props: TestPageProps) => {
    const {

    } = props;
    const list = Array(10).fill().map((_, i) => i);

    const [dir, setDir] = useState(true);
    return (
        <>
            <button onClick={() => setDir(!dir)}>dsfsfd</button>
            <SwapList
                type="offset"
                list={list}
                direction={!dir ? 'row' : 'column'}
                gap={8}
                onBlur={(v) => {
                    // console.log(v);
                }}
                onChange={(v) => {
                    // console.log(v);
                }}
            >
                {(item) => (
                    <DraggableItem
                        style={{
                            background: 'green',
                        }}
                    >
                        {item}
                    </DraggableItem>
                )}
            </SwapList>
        </>
    );
};

export default TestPage;
