import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from "S/ui/Kit/Text";
import { classNames } from "S/lib/classNames/classNames";
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const { className, block } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
            {block.title && (
                <Text title={block.title} className={cls.title} />
            )}
            {block.paragraphs.map((paragraph, index) => (
                <Text key={paragraph} children={paragraph} className={cls.paragraph} />
            ))}
        </div>
    );
});
