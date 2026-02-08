import { Form } from "./form";

export const myForm: Form = {
    title: "Sample Form",
    description: "This is a sample form description.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2nmWoa-66Yo5xylQwIiAxtvMrK2pB2l4CA&s",
    sections: [
        {
            title: "Basic Information",
            description: "Please provide your basic information.",
            fields: [
                {
                    label: "Your Name",
                    fieldType: {
                        fieldType: "SHORT_TEXT",
                        label: "Your Name"
                    },
                    required: true
                },
                {
                    label: "Your Name",
                    fieldType: {
                        fieldType: "LONG_TEXT",
                        label: "Your Name"
                    },
                    required: true
                },
                {
                    label: "Test",
                    fieldType: {
                        fieldType: "MULTIPLE_CHOICE",
                        options: [
                            { label: "Option 1", value: "option_1" },
                            { label: "Option 2", value: "option_2" },
                            { label: "Option 3", value: "option_3" }
                        ]
                    },
                    required: true
                },
                {
                    label: "Test",
                    fieldType: {
                        fieldType: "FILE_UPLOAD",
                        allowedFileTypes: ["image/png", "image/jpeg", "application/pdf"],
                        maxFileSizeMB: 5,
                        maxFiles: 3
                    },
                    required: true
                },
                {
                    label: "Survey",
                    fieldType: {
                        fieldType: "MULTIPLE_CHOICE_GRID",
                        options: {
                            rows: [
                                { label: "Quality", value: "quality" },
                                { label: "Value", value: "value" },
                                { label: "Usability", value: "usability" }
                            ],
                            columns: [
                                { label: "Poor", value: "poor" },
                                { label: "Average", value: "average" },
                                { label: "Excellent", value: "excellent" }
                            ]
                        }
                    },
                    required: true
                },
                {
                    label: "Rate our service",
                    fieldType: {
                        fieldType: "RATING",
                        options: {
                            maxRating: 5
                        }
                    },
                    required: true
                }
            ]
        }
    ]
};
