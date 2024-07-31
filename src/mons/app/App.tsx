import { useEffect, useMemo, useState } from "react"
import bd from "src/mons/shared/bd.json"
import { classNames } from "S/lib/classNames/classNames"
import { FoldTransition } from "S/ui/Animations/FoldTransition"
import Select from "S/ui/Kit/Select"
import { HStack, VStack } from "S/ui/Stack"
import cls from "./App.module.scss"
import MultiSelect from "S/ui/Kit/Select/MultiSelect/MultiSelect"
import Currency from "S/ui/BusinessLogic/Currency/Currency"

const App = () => {
    type Field = "name" | "size" | "price"
    const [field, setField] = useState<Field | undefined>("name");
    const [excludes, setExcludes] = useState<string[]>([]);
    const [gHide, setGHide] = useState(false);
    const [tmp, setTmp] = useState(false);

    const uStores = useMemo(() => {
        return bd.reduce((acc1, { stores }) => {
            stores.map(({ name }) => {
                if (!acc1.includes(name)) {
                    acc1.push(name)
                }

            })
            return acc1
        }, [])
    }, []);

    const mons = useMemo(() => {
        if (field) {
            return [...bd].sort((a, b) => {
                if (field === "price") {
                    let minA = Math.min(...a.stores.map(({ price }) => price))
                    let minB = Math.min(...b.stores.map(({ price }) => price))
                    if (minA > minB) {
                        return 1
                    } else if (minA < minB) {
                        return -1
                    } else {
                        return 0
                    }
                }
                if (a[field] > b[field]) {
                    return 1
                } else if (a[field] < b[field]) {
                    return -1
                }
                return 0
            })
        } else {
            return bd
        }
    }, [field])

    return (
        <VStack
            className={classNames(cls.App)}
            gap={8}
        >
            <HStack>
                <input
                    type={"checkbox"}
                    checked={gHide}
                    onChange={(e) => setGHide(e.target.checked)}
                />
                <input
                    type={"checkbox"}
                    checked={tmp}
                    onChange={(e) => setTmp(e.target.checked)}
                />
            </HStack>
            <HStack gap={8}>
                {
                    uStores.map(store => (
                        <HStack align="center" gap={8}
                            onClick={() => {
                                if (!excludes.includes(store)) {
                                    setExcludes([...excludes, store])
                                } else {
                                    setExcludes(excludes.filter(e => e !== store))
                                }
                            }}
                        >
                            <span
                                style={{ backgroundColor: excludes.includes(store) ? "red" : "transparent" }}
                            >{store}</span>
                        </HStack>
                    ))
                }
            </HStack>
            <Select
                defaultValue={field}
                values={[undefined, "name", "size", "price"]}
                onChange={(value) => {
                    setField(value)
                }}
            />
            <VStack
                className={cls.list}
                ref={(el) => {
                    if (el) {
                        // el.style.maxHeight = `${el.clientHeight / 2}px`
                    }
                }}
                justify="beetwen"
            >
                {mons.map(({ name, size, stores }, i) => {
                    const [isFold, setIsFold] = useState(gHide);
                    useEffect(() => {
                        setIsFold(gHide);
                    }, [gHide])

                    const isTotalHide = stores.filter(({ name, isNotHave }) => !excludes.includes(name) && !isNotHave).length === 0

                    if (tmp && isTotalHide) {
                        return null
                    }

                    return (
                        <VStack
                            key={i}
                            className={classNames(cls.monitor, { [cls.isHide]: isTotalHide })}
                            gap={8}>
                            <HStack
                                key={name}
                                className={cls.head}
                                justify="between"
                                onClick={() => setIsFold(!isFold)}>
                                <HStack gap={8}>
                                    <span>{name}</span>
                                    <span>{size}"</span>
                                </HStack>
                                <b>
                                    <Currency
                                        value={
                                            Math.min(...stores.filter(({ name, isNotHave }) => !excludes.includes(name) && !isNotHave)
                                                .map(({ price }) => price))
                                        }
                                        currency="RUB"
                                    />
                                </b>
                            </HStack>
                            <FoldTransition
                                in={!isFold}
                                timeout={100}
                            >
                                <VStack>
                                    {stores.map(({ name, link, price, isNotHave }, i) => (
                                        !(tmp && isNotHave) && <HStack
                                            key={i}
                                            className={classNames(cls.store, { [cls.isHide]: excludes.includes(name) })}
                                            gap={8}>
                                            <a href={link}>{name}</a>
                                            {isNotHave && <span style={{ color: "red" }}>Нет в наличии</span>}
                                            <Currency value={price} currency="RUB" startCurrency="RUB"></Currency>
                                        </HStack>
                                    ))}
                                </VStack>
                            </FoldTransition>
                        </VStack>
                    )
                })}
            </VStack>
        </VStack>
    )
}
export default App