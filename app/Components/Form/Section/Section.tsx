import FileUpload from '../Inputs/FileUpload/FileUpload';
import LongText from '../Inputs/LongText/LongText';
import MultipleChoice from '../Inputs/MultipleChoice/MultipleChoice';
import MultipleChoiceGrid from '../Inputs/MultipleChoiceGrid/MultipleChoiceGrid';
import Rating from '../Inputs/Rating/Rating';
import ShortText from '../Inputs/ShortText/ShortText';
import styles from './section.module.css'
import { FormSection } from '@/app/types/form'

export default function Section({ sectionData: section }: { sectionData: FormSection }) {
    return (
        <div className={styles.wrapper}>
            {(section.title || section.description) && (
                <div className={styles.header}>
                    {section.title && <h2>{section.title}</h2>}
                    {section.description && <p>{section.description}</p>}
                </div>
            )}

            {section.fields.map((field, fieldIndex) => {
                let inputElement;
                switch (field.fieldType.fieldType) {
                    case "SHORT_TEXT":
                        inputElement = <ShortText />;
                        break;
                    case "LONG_TEXT":
                        inputElement = <LongText />;
                        break;
                    case "MULTIPLE_CHOICE":
                        inputElement = <MultipleChoice options={field.fieldType.options} />;
                        break;
                    case "FILE_UPLOAD":
                        inputElement = <FileUpload />;
                        break;
                    case "MULTIPLE_CHOICE_GRID":
                        inputElement = <MultipleChoiceGrid rows={field.fieldType.options.rows} columns={field.fieldType.options.columns} />;
                        break;
                    case "RATING":
                        inputElement = <Rating maxRating={field.fieldType.options.maxRating} />;
                        break;
                    default:
                        inputElement = null;
                }

                return (
                    <div key={fieldIndex} className={styles.field}>
                        <label>{field.label}{field.required && <span className={styles.requiredAsterisk}>*</span>}</label>
                        {inputElement}
                    </div>
                )
            })}
        </div>
    )
}
