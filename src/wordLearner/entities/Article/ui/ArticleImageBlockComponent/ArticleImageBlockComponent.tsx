import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextAlign } from "S/ui/Kit/Text";
import { classNames } from "S/lib/classNames/classNames";
import cls from './ArticleImageBlockComponent.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <img src={block.src} alt={block.title} className={cls.img} />
            {block.title && (
                <Text children={block.title} align={TextAlign.CENTER} />
            )}
        </div>
    );
});
