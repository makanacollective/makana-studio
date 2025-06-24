// documents
import form from './form';
import happening from './happening';
import project from './project';
import resource from './resource';
import translationGroup from './translationGroup';
import writing from './writing';
// singletons
import aboutPage from './aboutPage';
import homePage from './homePage';
import websiteSettings from './websiteSettings';
// objects
import link from './link';
import localisedSlug from './localisedSlug';
import localisedString from './localisedString';
// modules
import auxiliaryPortableText from './auxiliaryPortableText';
import bodyPortableText from './bodyPortableText';
import { default as language } from './language';
import pageBuilder from './pageBuilder';
import localisedText from './localisedText';

export const schemaTypes = new Set([
    // documents
    form,
    happening,
    project,
    resource,
    translationGroup,
    writing,
    // singletons
    aboutPage,
    homePage,
    websiteSettings,
    // objects
    link,
    localisedSlug,
    localisedString,
    localisedText,
    // modules
    auxiliaryPortableText,
    bodyPortableText,
    language,
    pageBuilder,
    // {
    //     name: 'ignore',
    //     type: 'document',
    //     fields: [
    //         {
    //             name: 'ignore',
    //             type: 'string',
    //             readOnly: true,
    //             hidden: true,
    //         },
    //     ],
    // },
]);