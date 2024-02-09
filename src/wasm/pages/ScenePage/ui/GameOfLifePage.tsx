import {
    ForwardedRef,
    forwardRef, memo,
} from 'react';
import ScenePage from 'src/wasm/pages/ScenePage/ScenePage';
import GameOfLifePanel from 'src/wasm/widgets/GameOfLife/GameOfLifePanel/GameOfLifePanel';
import GameOfLifeScene from 'src/wasm/widgets/GameOfLife/GameOfLifeScene/GameOfLifeScene';

type El = HTMLElement | undefined;

interface GameOfLifeProps {

}

const GameOfLifePage = (props: GameOfLifeProps, ref: ForwardedRef<El>) => {
    const {
    } = props;

    return (
        <ScenePage scene={<GameOfLifeScene />} controlPanel={<GameOfLifePanel />} />
    );
};

export default memo(forwardRef(GameOfLifePage));
