// documents
import form from './form';
import happening from './happening';
import project from './project';
import resource from './resource';
import writing from './writing';
// singletons
import aboutPage from './aboutPage';
import homePage from './homePage';
import specialProject_counterMap from './specialProject_counterMap';
import specialProject_counterMap_initiative from './specialProject_counterMap_initiative';
import website from './website';
// objects
import link from './link';
import localisedSlug from './localisedSlug';
import localisedString from './localisedString';
// modules
import auxiliaryPortableText from './auxiliaryPortableText';
import bodyPortableText from './bodyPortableText';
import pageBuilder from './pageBuilder';
import localisedText from './localisedText';

export const schemaTypes = new Set([
    // documents
    form,
    happening,
    project,
    resource,
    writing,
    // singletons
    aboutPage,
    homePage,
    specialProject_counterMap,
    specialProject_counterMap_initiative,
    website,
    // objects
    link,
    localisedSlug,
    localisedString,
    localisedText,
    // modules
    auxiliaryPortableText,
    bodyPortableText,
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