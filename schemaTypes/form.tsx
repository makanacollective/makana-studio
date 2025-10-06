import { BillIcon, EditIcon, EyeOpenIcon, StringIcon, UnknownIcon } from '@sanity/icons';
import { defineArrayMember, defineField, defineType, SortOrderingItem } from 'sanity';
import { SelectIcon } from '../components/SelectIcon';
import { CheckboxIcon } from '../components/CheckboxIcon';
import { descriptions } from '../lib/descriptionUtils';
import { MonospaceStringInput } from '../components/MonospaceStringInput';
import { FormFieldOptionInput } from '../components/FormFieldOptionInput';
import { FormAttributesInput } from '../components/FormAttributesInput';
import { FormAttributesField } from '../components/FormAttributesField';
import { DEFAULT_LANGUAGE, FSI, PDI, renderLocalisedString } from '../lib/languageUtils';

export const FORM_ICON = BillIcon;

export const FORM_REFERENCE_NAME_ORDERING: SortOrderingItem[] = [
    {
        field: `referenceName`,
        direction: 'asc',
    },
];

const formFieldTypes = [
    {
        value: 'text',
        title: 'Single-line text field',
        description: 'Single-line text field',
        icon: StringIcon,
    },
    {
        value: 'textarea',
        title: 'Multi-line text field',
        description: 'Multi-line text field',
        icon: EditIcon,
    },
    {
        value: 'select',
        title: 'Dropdown menu (single-select field)',
        description: 'Dropdown menu (###)',
        icon: SelectIcon,
    },
    {
        value: 'checkbox',
        title: 'Checkbox group (multi-select field)',
        description: 'Checkbox group (###)',
        icon: CheckboxIcon,
    },
    {
        value: 'hidden',
        title: 'Hidden field (name and value)',
        description: 'Hidden field',
        icon: EyeOpenIcon,
    },
];

const normaliseLabel = (value?: string): string => {
    return (value || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();
};

export default defineType({
    name: 'form',
    type: 'document',
    title: 'Form',
    description: descriptions.document('all localised versions of a form'),
    icon: FORM_ICON,
    fields: [
        defineField({
            name: 'referenceName',
            type: 'string',
            title: 'Reference Name',
            description: descriptions.formReferenceName(),
        }),
        defineField({
            name: 'endpoint',
            type: 'url',
            title: 'Endpoint',
            description: descriptions.formEndpoint(),
            validation: (Rule) => Rule.required().error('A valid endpoint is required for the form to function'),
            components: {
                input: MonospaceStringInput,
            },
        }),
        defineField({
            name: 'fields',
            type: 'array',
            title: 'Fields',
            description: descriptions.formFields(),
            of: [
                defineArrayMember({
                    type: 'object',
                    title: 'Field',
                    fields: [
                        defineField({
                            name: 'type',
                            type: 'string',
                            title: 'Type',
                            description: descriptions.formFieldType(),
                            initialValue: 'text',
                            options: {
                                list: formFieldTypes,
                                layout: 'dropdown',
                            },
                        }),
                        defineField({
                            name: 'label',
                            type: 'localisedString',
                            title: 'Label',
                            description: descriptions.formFieldLabel(),
                            hidden: ({ parent }) => parent.type === 'hidden',
                            validation: (Rule) => Rule.custom((value: Record<string, string>) => {
                                const defaultLanguageId = DEFAULT_LANGUAGE?.id;
                                const defaultLanguageName = DEFAULT_LANGUAGE?.title;
                                if (!value || !defaultLanguageId || !defaultLanguageName) return true;
                                const currentLabel = value[defaultLanguageId];
                                if (!currentLabel) return true;
                                const normalisedLabel = normaliseLabel(currentLabel);
                                if (/^field\s*\d+$/i.test(normalisedLabel)) {
                                    return `Avoid generic ${defaultLanguageName} labels like 'field 1', 'field2', etc., as they can cause issues with form handling`;
                                }
                                return true;
                            }),
                        }),
                        defineField({
                            name: 'options',
                            type: 'array',
                            title: 'Options',
                            description: descriptions.formFieldOptions(),
                            hidden: ({ parent }) => !['select', 'checkbox'].includes(parent?.type),
                            of: [
                                defineArrayMember({
                                    type: 'string',
                                    components: {
                                        input: FormFieldOptionInput,
                                    },
                                    // TODO prevent names like Option 1 or any variations thereof
                                    // TODO ensure uniqueness
                                }),
                            ],
                        }),
                        defineField({
                            name: 'name',
                            type: 'string',
                            title: 'Name',
                            description: descriptions.formFieldName(),
                            hidden: ({ parent }) => !(parent?.type === 'hidden'),
                            validation: (Rule) => [
                                Rule.custom((value, context) => {
                                    const parent = context.parent as any | undefined;
                                    if (!value && parent?.type === 'hidden') {
                                        return 'A name is required for this field';
                                    }
                                    return true;
                                }).warning(),
                                Rule.custom((value, context) => {
                                    const parent = context.parent as any | undefined;
                                    if (!value || parent.type !== 'hidden') return true;
                                    const validPattern = /^[\w.\[\]-]+$/i;
                                    if (!validPattern.test(value)) {
                                        return 'Use only Latin letters, numbers, underscores, hyphens, periods, and square brackets';
                                    }
                                    return true;
                                }).error(),
                            ],
                            components: {
                                input: MonospaceStringInput,
                            },
                        }),
                        defineField({
                            name: 'value',
                            type: 'string',
                            title: 'Value',
                            description: descriptions.formFieldValue(),
                            hidden: ({ parent }) => !(parent?.type === 'hidden'),
                            components: {
                                input: MonospaceStringInput,
                            },
                        }),
                    ],
                    preview: {
                        select: {
                            type: 'type',
                            name: 'name',
                            label: 'label',
                            options: 'options',
                        },
                        prepare(selection) {
                            const {
                                type,
                                name,
                                label,
                                options = [],
                            } = selection;
                            const correspondingFormFieldType = formFieldTypes.find((formFieldType) => formFieldType.value === type);
                            return {
                                title: type && type === 'hidden' ? name : (renderLocalisedString(label) || name),
                                subtitle: correspondingFormFieldType?.description?.replace('###', `${options?.length || 0} option${options?.length === 1 ? '' : 's'}`) || 'No type selected',
                                media: correspondingFormFieldType?.icon || UnknownIcon,
                            };
                        },
                    },
                }),
            ],
            validation: (Rule) => Rule.custom((fields: any[] = []) => {
                const defaultLanguageId = DEFAULT_LANGUAGE?.id;
                const defaultLanguageName = DEFAULT_LANGUAGE?.title;
                if (!fields || !Array.isArray(fields) || !defaultLanguageId || !defaultLanguageName) return true;
                const valueMap = new Map();
                const duplicateIndexes = new Set<number>();
                fields.forEach((field: any, index) => {
                    let key = null;
                    if (field.type === 'hidden' && field.name) {
                        key = normaliseLabel(field.name);
                    }
                    if (field.type !== 'hidden' && field.label && field.label[defaultLanguageId]) {
                        key = normaliseLabel(field.label[defaultLanguageId]);
                    }
                    if (key) {
                        if (valueMap.has(key)) {
                            duplicateIndexes.add(index);
                            duplicateIndexes.add(valueMap.get(key));
                        } else {
                            valueMap.set(key, index);
                        }
                    }
                });
                if (duplicateIndexes.size > 0) {
                    return {
                        paths: [...duplicateIndexes].map((i) => [{ _key: fields[i]._key }]),
                        message: `Some ${defaultLanguageName} field labels or names are duplicated`,
                    };
                }
                return true;
            }),
        }),
        defineField({
            name: 'attributes',
            type: 'array',
            title: 'Attributes',
            description: descriptions.formAttributes(),
            of: [
                defineArrayMember({
                    type: 'string',
                    components: {
                        input: FormAttributesInput,
                    },
                    validation: (Rule) => Rule.custom((value) => {
                        if (!value) return true;
                        const parsed = JSON.parse(value ?? '{}');
                        if (!parsed) return true;
                        return (!parsed.key || !parsed.key?.trim()) && parsed.value && parsed.value.trim() ? 'Each value must have a key' : true;
                    }).warning(),
                }),
            ],
            components: {
                field: FormAttributesField,
            },
        }),
    ],
    orderings: [
        {
            name: 'referenceNameAsc',
            title: 'reference name',
            by: FORM_REFERENCE_NAME_ORDERING,
        },
    ],
    preview: {
        select: {
            referenceName: 'referenceName',
            fields: 'fields',
        },
        prepare(selection) {
            const {
                referenceName,
                fields,
            } = selection;
            return {
                title: referenceName ? `${FSI}${referenceName}${PDI}` : undefined,
                subtitle: `${fields?.length || '0'} field${fields?.length === 1 ? '' : 's'}`,
            };
        },
    },
});