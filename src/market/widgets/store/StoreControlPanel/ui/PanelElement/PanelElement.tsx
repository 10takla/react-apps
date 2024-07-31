import {
    forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, Fragment, cloneElement, ReactElement, useState, useEffect,
} from 'react';
import { HStack, VStack } from "S/ui/Stack";
import { classNames } from "S/lib/classNames/classNames";
import Hidden from "S/ui/Kit/Hidden/Hidden";
import { useAppDispatch } from "S/lib/hooks/useAppDispatch";
import { useSelector } from 'react-redux';
import { MarketScheme } from "src/market/app/MarketProvider/MarketProvider";
import InputRange from "S/ui/Kit/Input/ui/InputRange/InputRange";
import cls from './PanelElement.module.scss';
import { storeActions } from "src/market/app/MarketProvider/slices/storeSlice";
import Select from "S/ui/Kit/Select";

type Els = 'button' | 'slider' | 'selector' | 'hower'

interface Extra<T = Els> {
    type: T,
    svg: ReactElement,
    decription: T extends 'button' ?
    [string, string] | string : string,
}

interface Extras extends Record<Els, any> {
    button: {

    },
    slider: Record<'min' | 'max', number>,
    selector: {

    }
}

type Field<T = Els> = T extends 'hower' ? Extra : Extra & { field: string }

export type Elmap<T extends keyof Extras = Els> = Field<T> & Extras[T];

type El = ElementRef<typeof HStack> | null;

interface PanelElementProps extends ComponentProps<typeof HStack> {
    head: Elmap
    content: Elmap[]
}

const PanelElement = (props: PanelElementProps, ref: ForwardedRef<El>) => {
    const {
        className,
        head,
        content,
        ...otherProps
    } = props;

    const panelElementRef = useRef<El>(null);
    useImperativeHandle<El, El>(
        ref,
        () => panelElementRef.current,
    );

    const [isHidden, setIsHidden] = useState(true)
    const [isGlobalFrozen, setIsGlobalFrozen] = useState(false);
    const dispatch = useAppDispatch();
    const { events: { isMove }, controlPanel: store } = useSelector((state: MarketScheme) => state.store);
    
    const rec = (fields: string[], value: any) => {
        const tmp = (fields: string[], value: any) => {
            if (fields.length) {
                const [start, ...other] = fields;
                return {
                    [start]: rec(other, value),
                };
            }
            return value;
        }
        return tmp(['controlPanel', ...fields], value)
    };
    
    const getFieldValue = ({ field }) => (
        field.split('.')
            .reduce((acc, field) => {
                return acc[field];
            }, store)
    )

    const els: Record<Els, ReactElement> = {
        button: (el) => {
            const field = getFieldValue(el);
            // console.log(field);

            return cloneElement(el.svg, {
                className: classNames('', { [cls.active]: field }),
                onClick: () => {
                    dispatch(storeActions.setState(rec(el.field.split('.'), !field)));
                },
            });
        },
        slider: ({ min, max, ...el }) => {
            const fieldValue = getFieldValue(el);
            const [isHide, setIsHide] = useState(true);
            const [isFrozen, setIsFrozen] = useState(false);

            useEffect(() => {
                setIsGlobalFrozen(isFrozen)
            }, [isFrozen]);

            return (
                <HStack
                    style={{
                        position: 'relative'
                    }}
                    onMouseEnter={() => {
                        setIsHide(false);
                    }}
                    onMouseLeave={() => {
                        setIsHide(true);
                    }}
                >
                    {el.svg}
                    <Hidden isHidden={isHide && !isFrozen}>
                        <InputRange
                            style={{
                                fontSize: '0.5em',
                                position: 'absolute',
                                left: '100%'
                            }}
                            side='left'
                            onFocus={() => {
                                setIsFrozen(true)
                            }}
                            onChange={(values) => {
                                dispatch(storeActions.setState(rec(el.field.split('.'), values[0])));
                            }}
                            onBlur={() => {
                                setIsFrozen(false)
                            }}
                            values={[fieldValue]}
                            {...{ min, max }}
                        />
                    </Hidden>
                </HStack>
            );
        },
        hover: (el) => {
            return el.svg;
        },
        selector: ({ values, svg, field, ...el }) => {
            const [isHide, setIsHide] = useState(true);
            const [isFrozen, setIsFrozen] = useState(false);

            useEffect(() => {
                setIsGlobalFrozen(isFrozen)
            }, [isFrozen]);

            return (
                <HStack
                    onMouseEnter={() => {
                        setIsHide(false);
                    }}
                    onMouseLeave={() => {
                        setIsHide(true);
                    }}
                >
                    {svg}
                    <Hidden isHidden={isHide && !isFrozen}>
                        <Select
                            {...el}
                            onFocus={() => {
                                setIsFrozen(true)
                            }}
                            onBlur={() => {
                                setIsFrozen(false)
                            }}
                            defaultValue={field.split('.').reduce((acc, curr) => acc[curr], store)}
                            values={values}
                            onChange={(value) => {
                                dispatch(storeActions.setState(rec(field.split('.'), Number(value))));
                            }}
                        />
                    </Hidden>
                </HStack>
            );
        },
    };

    return (
        <VStack
            onMouseOver={() => {
                setIsHidden(false);
            }}
            onMouseLeave={() => {
                setIsHidden(true);
            }}
            style={{
                padding: '0.5em 0.5em 0 0.5em',
                background: 'red'
            }}
        >
            <Hidden
                isHidden={!isMove ? (isHidden && !isGlobalFrozen) : true}
            >
                <VStack>
                    {content.map((el, i) => (
                        <Fragment key={`${i}`}

                        >
                            {els[el.type](el)}
                        </Fragment>
                    ))}
                </VStack>
            </Hidden>
            {head.svg}
        </VStack>
    );
};

export default memo(forwardRef(PanelElement));
