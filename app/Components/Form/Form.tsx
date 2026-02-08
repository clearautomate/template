import { Form as formType } from '@/app/types/form'
import styles from './form.module.css'
import Section from './Section/Section'

export default function Form({ formData }: { formData: formType }) {
    return (
        <div className={styles.wrapper}>
            <div>
                <h1>{formData.title}</h1>
                <p>{formData.description}</p>
                {/* {formData.imageUrl && <img src={formData.imageUrl} alt="Form Image" />} */}
            </div>
            <div>
                {formData.sections.map((section, index) => (
                    // <div key={index}>
                    //     <h2>{section.title}</h2>
                    //     {section.fields.map((field, fieldIndex) => (
                    //         <div key={fieldIndex}>
                    //             <label>{field.label}</label>
                    //             {/* Render input based on fieldType */}
                    //             <input type="text" />
                    //         </div>
                    //     ))}
                    // </div>
                    <Section key={index} sectionData={section} />
                ))}
            </div>
        </div>
    )
}