import MarkdownEditor from '@uiw/react-markdown-editor';
import { useEffect, useState } from 'react';

const ContentInput = (props: {
        value: string,
        error?: boolean,
        helperText?: string,
        onChange: ((newValue: string) => void),
        onBlur: () => void}
    ) => {
    const [value, setValue] = useState(props.value);
    const [error, setError] = useState(props.error === true);
    const [helperText, setHelperText] = useState(props.helperText !== undefined ? props.helperText : '');

    useEffect(() => {
        setValue(props.value);
        setError(props.error === true);
        setHelperText(props.helperText !== undefined ? props.helperText : '');
    }, [props.value, props,error, props.helperText]);

    return(
        <>
            <div className={`customInputField ${error ? 'customInputError' : ''}`}>
                <label className={'shrinkedLabel'}>Content *</label>
                <MarkdownEditor
                    value={value}
                    minHeight='200px'
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            </div>
            {
                error ? <p className='customInputError'>{helperText}</p> : <></>
            }
        </>
    );
}

export default ContentInput;