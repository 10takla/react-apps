import {
    forwardRef, memo, ForwardedRef,
} from 'react';
import ScenePage from 'src/wasm/pages/ScenePage/ScenePage';
import PlanetPanel from 'src/wasm/widgets/Planet/PlanetPanel/PlanetPanel';
import PlanetScene from 'src/wasm/widgets/Planet/PlanetScene/PlanetScene';

type El = HTMLElement | undefined;

interface PlanetProps {

}

const PlanetPage = (props: PlanetProps, ref: ForwardedRef<El>) => {
    const {
    } = props;

    return (
        <ScenePage
            scene={<PlanetScene />}
            controlPanel={<PlanetPanel />}
        />
    );
};

export default memo(forwardRef(PlanetPage));
