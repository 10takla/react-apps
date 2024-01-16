import fs from 'fs';
import ts from 'typescript';

const compile = (path: string) => {
    const tsCode = fs.readFileSync(path, 'utf-8');

    const compilerOptions = {
        target: ts.ScriptTarget.ESNext,
        module: ts.ModuleKind.CommonJS,
    };

    const result = ts.transpileModule(tsCode, { compilerOptions });

    // const jsCode = result.outputText.split('require("jquery");\r\n')[1]
    //     .split('(0, jquery_1.default)').join('$');
    return result.outputText;
};

console.log(compile(`${__dirname}/filesForCompile/chatGPT/index.ts`));

export default compile;
