import { forwardRef, memo, ForwardedRef, ComponentProps, useImperativeHandle, useRef, ElementRef, useContext } from 'react';
import { HStack } from 'src/shared/ui/Stack';
import { classNames } from 'src/shared/lib/classNames/classNames';
import cls from './Pdf.module.scss';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { langContext, T } from '../ToggleLanguage/ToggleLanguage';
import PdfSvg from "S/assets/icons/pdf.svg"
import { FileforgeClient } from "@fileforge/client";
import * as fs from "fs";
import { compile, PageBreak } from "@fileforge/react-print";
import html2pdf from 'html2pdf.js';
import { Console } from 'console';

type Component = typeof HStack;
type ElRef = ElementRef<Component> | null;

interface PdfProps extends ComponentProps<Component> {

}

const Pdf = (props: PdfProps, ref: ForwardedRef<ElRef>) => {
    const {
        className,
        ...otherProps
    } = props;

    const pdfRef = useRef<ElRef>(null);
    useImperativeHandle<ElRef, ElRef>(
        ref,
        () => pdfRef.current,
    );

    const [t] = useContext(langContext);

    const exportPDF = () => {
        const element = document.getElementById('pdf-content');
        if (!element) return
        html2pdf().from(element).set({
            filename: `${t("Резюме")}. ${t("Абакар Летифов")}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: { scale: 4, useCORS: true },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        }).save();
    };

    return (
        <button
            className={classNames(cls.Pdf, [className])}
            ref={pdfRef}
            onClick={() => exportPDF()}
            {...otherProps}
        >
            <PdfSvg />
        </button>
    )
};

export default memo(forwardRef(Pdf));