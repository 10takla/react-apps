import ThemeProvider from "S/providers/theme/ThemeProvider";
import App from './app/App';
import MarketProvider from './app/MarketProvider/MarketProvider';

const Market = () => {
    return (
        <ThemeProvider>
            <MarketProvider>
                <App />
            </MarketProvider>
        </ThemeProvider>
    );
};

export default Market;
