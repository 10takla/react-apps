import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text, TextSize } from "S/ui/Kit/Text";
import { classNames } from "S/lib/classNames/classNames";
import { VStack } from "S/ui/Stack";
import { ArticleList } from '@/entities/Article';
import {
    useArticleRecommendationsList,
} from '../../api/aritcleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { isLoading, data: articles, error } = useArticleRecommendationsList(3);

    if (isLoading || error || !articles) {
        return null;
    }

    return (
        <VStack gap="8" className={classNames('', {}, [className])}>
            <Text
                size={TextSize.L}
                title={t('Рекомендуем')}
            />
            <ArticleList
                articles={articles}
                target="_blank"
            />
        </VStack>
    );
});
