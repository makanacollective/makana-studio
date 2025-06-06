import { ObjectItemProps, useClient, useFormValue } from 'sanity';
import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { Box, Card, CardTone, Flex, Stack, Text, useTheme } from '@sanity/ui';
import { renderPortableTextAsPlainText } from '../lib/portableTextUtils';
import { LANGUAGE_FIELD_NAME, SUPPORTED_LANGUAGES } from '../lib/languageUtils';

export const PageBuilderBlockPreview = (props: ObjectItemProps & { value: any; }) => {

    const {
        changed,
        inputProps,
        readOnly,
        schemaType,
        value,
    } = props;

    const currentLanguage = useFormValue([LANGUAGE_FIELD_NAME]);
    const currentLanguageInfo = SUPPORTED_LANGUAGES.find((lang) => lang.id === currentLanguage);

    const blockName = schemaType?.name;
    const blockTitle = schemaType?.title;

    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const hasChanges = changed;
    const isLocked = readOnly;
    // @ts-ignore
    const hasErrors = inputProps.members?.some((member) => Array.isArray(member?.field?.validation) && member.field?.validation?.some((v) => v?.level === 'error'));

    const renderDefaultTone = useMemo(() => {
        if (hasErrors) {
            return 'critical';
        };
        if (hasChanges) {
            return 'caution';
        };
        return 'positive';
    }, [hasErrors, hasChanges]);
    const theme = useTheme().sanity.v2?.color;
    const renderHoverTone = useMemo(() => {
        if (isLocked || !isHovered) {
            return undefined;
        };
        if (hasErrors) {
            return theme?.button.bleed.critical.pressed.bg;
        };
        if (hasChanges) {
            return theme?.button.bleed.caution.pressed.bg;
        };
        return theme?.button.bleed.positive.pressed.bg;
    }, [hasErrors, hasChanges, isLocked, isHovered, theme]);

    const MEDIA_PLACEHOLDER_DEFAULT_WIDTH = 4;
    const MEDIA_PLACEHOLDER_DEFAULT_HEIGHT = 3;
    const MEDIA_PLACEHOLDER_DEFAULT_ASPECT_RATIO = MEDIA_PLACEHOLDER_DEFAULT_WIDTH / MEDIA_PLACEHOLDER_DEFAULT_HEIGHT;
    const MediaPlaceHolder = ({
        aspectRatio,
        text,
        text2,
        tone = 'suggest',
        desiredWidth = '12.5rem',
        desiredHeight = '12.5rem',
        maxWidth = '12.5rem',
        maxHeight = '12.5rem',
    }: {
        aspectRatio: CSSProperties['aspectRatio'];
        text?: string | JSX.Element;
        text2?: string | JSX.Element;
        tone?: CardTone;
        desiredWidth?: CSSProperties['width'];
        desiredHeight?: CSSProperties['height'];
        maxWidth?: CSSProperties['maxWidth'];
        maxHeight?: CSSProperties['maxHeight'];
    }) => {
        const { isWide, w, h } = useMemo(() => {
            let w = MEDIA_PLACEHOLDER_DEFAULT_WIDTH, h = MEDIA_PLACEHOLDER_DEFAULT_HEIGHT;
            if (aspectRatio) {
                if (typeof aspectRatio === 'string') {
                    const normalised = aspectRatio.replace(/\s+/g, '');
                    const match = normalised.trim().match(/^(\d*\.?\d+)(?:\/(\d*\.?\d+))?$/);
                    if (match) {
                        w = parseFloat(match[1]);
                        h = match[2] ? parseFloat(match[2]) : 1;
                        if (!isFinite(w) || !isFinite(h) || h === 0) {
                            w = MEDIA_PLACEHOLDER_DEFAULT_WIDTH;
                            h = MEDIA_PLACEHOLDER_DEFAULT_HEIGHT;
                        };
                    };
                };
                if (typeof aspectRatio === 'number') {
                    w = aspectRatio;
                    h = 1;
                };
            };
            return {
                isWide: w / h >= 1,
                w,
                h,
            };
        }, [aspectRatio]);
        return (<>
            <div style={{ aspectRatio: `${w}/${h}`, maxWidth, maxHeight, width: (isWide ? desiredWidth : 'auto'), height: (!isWide ? desiredHeight : 'auto'), minHeight: 'calc(1lh + 0.5rem)', position: 'relative', marginInline: 'auto', }}>
                <Card padding={2} border={true} radius={2} tone={tone} style={{ position: 'absolute', inset: '0', boxSizing: 'border-box', }}>
                    <svg width='10' height='10' viewBox='0 0 10 10' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg' style={{ position: 'absolute', inset: '0px', width: '100%', height: '100%', overflow: 'visible', }}>
                        <line x1='0' y1='0' x2='10' y2='10' stroke='var(--card-border-color)' strokeWidth='1' vectorEffect='non-scaling-stroke' />
                        <line x1='10' y1='0' x2='0' y2='10' stroke='var(--card-border-color)' strokeWidth='1' vectorEffect='non-scaling-stroke' />
                    </svg>
                    {text && (
                        <Card padding={2} radius={2} tone={'inherit'} style={{ position: 'relative', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'fit-content', maxWidth: '100%', }}>
                            <Stack space={2}>
                                <Text size={1} muted={true} textOverflow={'ellipsis'} align={'center'}>
                                    <code style={{ color: 'currentcolor', background: 'transparent', }}>{text}</code>
                                </Text>
                                {text2 && (
                                    <Text size={1} muted={true} textOverflow={'ellipsis'} align={'center'}>
                                        <code style={{ color: 'currentcolor', background: 'transparent', }}>{text2}</code>
                                    </Text>
                                )}
                            </Stack>
                        </Card>
                    )}
                </Card>
            </div>
        </>)
    };

    const client = useClient({ apiVersion: '2025-05-15', });

    const [fetchedData, setFetchedData] = useState<any>(null);

    useEffect(() => {
        if (blockName === 'formBlock' && value?.form?._ref) {
            client.fetch(`*[_id == $id][0] {title}`, { id: value.form._ref, }).then(setFetchedData);
        }
        if (blockName === 'imageBlock' && Array.isArray(value?.images)) {
            const fetchImages = async () => {
                const results = await Promise.all(
                    value.images.map((image: any) =>
                        image.asset?._ref
                            ? client.fetch(`*[_id == $id][0]{_id,metadata{dimensions{aspectRatio}}}`, { id: image.asset._ref, })
                            : null
                    )
                );
                setFetchedData(results.filter(Boolean));
            };
            fetchImages();
        }
    }, [blockName, value?.form?._ref, value?.images]);
    
    return props.renderDefault({
        ...props,
        inputProps: {
            ...inputProps,
            renderPreview: () => (
                <Card border={true} radius={1} tone={renderDefaultTone} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <Card padding={3} border={true} tone={renderDefaultTone} style={{ borderInline: 'none', borderBlockStart: 'none', background: renderHoverTone, }}>
                        <Flex justify={'space-between'}>
                            <Text size={1} weight={'medium'} muted={true}>
                                <Flex align={'center'} gap={3}>
                                    {schemaType.icon && (
                                        <Box>
                                            {/* @ts-ignore */}
                                            {schemaType.icon?.render()}
                                        </Box>
                                    )}
                                    <Box>
                                        {blockTitle ? blockTitle + (blockTitle.endsWith('Block') ? '' : ' Block') : <code>{blockName}</code>}
                                    </Box>
                                </Flex>
                            </Text>
                        </Flex>
                    </Card>
                    <Card padding={3} tone={isHovered && !isLocked ? 'transparent' : 'default'}>
                        <Stack space={3}>
                            {
                                (
                                    {
                                        'textBlock': (<>
                                            <Text dir={currentLanguageInfo?.dir || 'auto'} size={1} align={!value.text ? 'center' : undefined} style={{ whiteSpace: 'pre-wrap', }}>
                                                {renderPortableTextAsPlainText(value.text, { withNotation: true }) || <em>No text</em>}
                                            </Text>
                                        </>),
                                        'imageBlock': (<>
                                            <Flex gap={3} direction={currentLanguageInfo?.dir === 'rtl' ? 'row-reverse' : 'row'} align={'flex-start'} justify={'center'} style={{ pointerEvents: 'none', }}>
                                                {value.images && value.images.length !== 0 && value.images.map((_image: any, index: number, array: []) => {
                                                    const correspondingImage = fetchedData?.find((fetchedImage: any) => fetchedImage?._id === _image?.asset?._ref);
                                                    return (
                                                        <div style={{ width: `calc((100% - ((${array.length} - 1) * 0.75rem)) / ${array.length})`, }}>
                                                            <MediaPlaceHolder aspectRatio={correspondingImage?.metadata?.dimensions?.aspectRatio || MEDIA_PLACEHOLDER_DEFAULT_ASPECT_RATIO} text={`Image ${index + 1}`} text2={correspondingImage?.metadata?.dimensions?.aspectRatio?.toFixed(1) || <em>No asset</em>} desiredWidth={'auto'} desiredHeight={'auto'} />
                                                        </div>
                                                    );
                                                }) || (
                                                    <MediaPlaceHolder aspectRatio={MEDIA_PLACEHOLDER_DEFAULT_ASPECT_RATIO} text={<em>No image</em>} desiredWidth={'100%'} desiredHeight={'auto'} />
                                                )}
                                            </Flex>
                                            <Text dir={currentLanguageInfo?.dir || 'auto'} size={1} align={!value.caption ? 'center' : undefined} style={{ whiteSpace: 'pre-wrap', }}>
                                                {renderPortableTextAsPlainText(value.caption, { withNotation: true }) || <em>No caption</em>}
                                            </Text>
                                        </>),
                                        'videoEmbedBlock': (<>
                                            <Flex direction={'column'} gap={3} align={'center'} justify={'flex-start'} style={{ pointerEvents: 'none', }}>
                                                <MediaPlaceHolder aspectRatio={value.aspectRatio || MEDIA_PLACEHOLDER_DEFAULT_ASPECT_RATIO} text={value.aspectRatio || <em>No aspect ratio</em>} />
                                                <div style={{ maxWidth: '100%', }}>
                                                    <Text size={1} textOverflow={'ellipsis'}>
                                                        {value.url ? value.url.replace('http://www.', '').replace('https://www.', '').replace('http://', '').replace('https://', '') : <em>No URL</em>}
                                                    </Text>
                                                </div>
                                            </Flex>
                                            <Text dir={currentLanguageInfo?.dir || 'auto'} size={1} align={!value.caption ? 'center' : undefined} style={{ whiteSpace: 'pre-wrap', }}>
                                                {renderPortableTextAsPlainText(value.caption, { withNotation: true }) || <em>No caption</em>}
                                            </Text>
                                        </>),
                                        'formBlock': (<>
                                            <Text size={1} textOverflow={'ellipsis'} align={'center'}>
                                                {fetchedData ? (<><em>Selected form:</em> <bdi>{'Untitled form'}</bdi></>) : <em>No form selected</em>}
                                            </Text>
                                        </>),
                                    } as Record<string, React.JSX.Element>
                                )[blockName] || (<>
                                    <Text size={1} align={'center'}>
                                        <em>No preview available</em>
                                    </Text>
                                </>)
                            }
                        </Stack>
                    </Card>
                </Card>
            ),
        },
    });
};