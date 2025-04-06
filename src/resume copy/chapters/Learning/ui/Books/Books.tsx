import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useContext, useEffect, useImperativeHandle, useRef } from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack } from 'src/shared/ui/Stack';
import cls from './Books.module.scss';
import { books, Book as BookType } from 'src/resume copy/shared/const/info';
import { langContext } from 'src/resume copy/shared/ui/ToggleLanguage/ToggleLanguage';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface BooksProps extends ComponentProps<Component> {

}

const Book = ({ book: b }: { book: BookType }) => {
    const [_, [lang]] = useContext(langContext);

    let book;
    if (typeof b[0] === "object" && "ru" in b[0] && "en" in b[0]) {
        book = {
            name: b[0][lang][0],
            link: b[1],
            cover: b[0][lang][1],
        };
    } else {
        book = {
            name: b[0],
            link: b[1],
            cover: b[2],
        }
    }
    return (
        <a className={cls.book} href={book.link} title={book.name}>
            {book.cover ?
                typeof book.cover === "string" ?
                    <img src={book.cover} />
                    :
                    book.cover
                :
                <HStack className={cls.cover}>
                    <div />
                    <h1>{book.name}</h1>
                </HStack>
            }
        </a>
    )
}

const Books = (props: BooksProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const booksRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => booksRef.current,
    );
    return (
        <HStack
            className={classNames(cls.Books, [className])}
            ref={booksRef}
            {...otherProps}
        >
            {books.map((book, i) => (
                <Book key={i} {...{ book }} />
            ))}
        </HStack>
    )
};

export default memo(forwardRef(Books));