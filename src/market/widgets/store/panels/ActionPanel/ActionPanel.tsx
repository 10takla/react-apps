import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useState } from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import cls from './ActionPanel.module.scss';
import Input from "S/ui/Kit/Input/Input";
import { Button, ButtonTheme } from "S/ui/Kit/Button";
import { useAppDispatch } from "S/lib/hooks/useAppDispatch";
import { storeActions } from "src/market/app/MarketProvider/slices/storeSlice";
import { MarketScheme } from "src/market/app/MarketProvider/MarketProvider";
import { useSelector } from 'react-redux';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface ActionPanelProps extends ComponentProps<Component> {

}

const ActionPanel = (props: ActionPanelProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const actionPanelRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => actionPanelRef.current,
    );
    const [pointsCount, setCount] = useState<number>();
    const dispatch = useAppDispatch()
    const {reset, set} = useSelector((state: MarketScheme) => state.store.actionPanel)
    return (
        <HStack
            className={classNames(cls.ActionPanel, [className])}
            ref={actionPanelRef}
            {...otherProps}
        >
            <VStack>
                <HStack>
                    <Input type="number" max={100} min={0}
                        onChange={(e) => {
                            const num = Number(e.target.value);
                            if (Number.isNaN(num)) {
                                setCount(undefined)
                            } else {
                                setCount(num)
                            }
                        }}
                    />
                    <Button theme={ButtonTheme.BACKGROUND_INVERTED}
                        onClick={() => {
                            dispatch(storeActions.setState({ actionPanel: { pointsCount } }))
                            dispatch(storeActions.setState({ actionPanel: { set: set + 1 } }))
                        }}
                    >Set</Button>
                </HStack>
                <HStack>
                    <Button theme={ButtonTheme.BACKGROUND_INVERTED}
                        onClick={() => {
                            dispatch(storeActions.setState({ actionPanel: { reset: reset + 1 } }))
                        }}
                    >Reset</Button>
                </HStack>
            </VStack>

        </HStack>
    )
};

export default memo(forwardRef(ActionPanel));