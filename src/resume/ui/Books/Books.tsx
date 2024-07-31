import { ComponentProps, ElementRef, ForwardedRef, forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { HStack } from 'src/shared/ui/Stack';
import cls from './Books.module.scss';
import { books, Book as BookType } from 'src/resume/info';


type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface BooksProps extends ComponentProps<Component> {

}

const Book = ({ book: b }: {book: BookType}) => {
    const book = {
        name: b[0],
        link: b[1],
        cover: b[2],
    };
    if (book.cover) {

    }
    return (
        <HStack tag="a" align="center" justify="center" className={cls.book} href={book.link} >
            {book.cover ? <img src={book.cover} /> :
                <HStack className={cls.cover}>
                    <div />
                    <h1>{book.name}</h1>
                </HStack>
            }
        </HStack>
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
            justify="between" gap={8}            {...otherProps}
        >
            {books.map((book) => (
                <Book {...{ book }} />
            ))}
        </HStack>
    )
};

export default memo(forwardRef(Books));