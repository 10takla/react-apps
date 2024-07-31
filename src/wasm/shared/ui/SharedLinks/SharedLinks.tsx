import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Portal from "S/ui/Portal/Portal";
import { HStack } from "S/ui/Stack";
import { RouteProps } from "src/wasm/app/providers/routes/routesContext";

interface SharedLinksProps {
    routes: RouteProps[]
}

const SharedLinks = (props: SharedLinksProps) => {
    const {
        routes,
    } = props;

    const [isParentReady, setIsParentReady] = useState(false);

    useEffect(() => {
        const checkParentExists = () => {
            const parentElement = document.querySelector('[data-portal-links]');
            if (parentElement) {
                setIsParentReady(true);
            } else {
                requestAnimationFrame(checkParentExists);
            }
        };

        checkParentExists();
    }, []);

    return (
        isParentReady ? (
            <Portal to="[data-portal-links]">
                <HStack>
                    {routes.map(({ path, linkText }) => (
                        <Link key={path} to={path}>{linkText}</Link>
                    ))}
                </HStack>
            </Portal>
        ) : null
    );
};

export default memo(SharedLinks);
