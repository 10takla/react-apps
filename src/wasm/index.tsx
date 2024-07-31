import ThemeProvider from "S/providers/theme/ThemeProvider";
import { App } from './app/App';
import SceneProvider from './app/providers/SceneProvider/SceneProvider';

const Wasm = () => {
    return (
        <ThemeProvider theme="light">
            <SceneProvider>
                <App />
            </SceneProvider>
        </ThemeProvider>
    );
};

export default Wasm;
