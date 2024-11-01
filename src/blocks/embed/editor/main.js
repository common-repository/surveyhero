import './editor.scss';
import {getIcon} from "../../../utils/GetIcon";
import {EmbedSettings} from "./EmbedSettings";

const {registerBlockType} = wp.blocks;

function initBlockSelectionOnIframeClick(props) {
    jQuery(window).off('blur.surveyhero').on('blur.surveyhero', () => {
        // The setTimeout is to compensate for a bug with activeElement Firefox (http://forums.mozillazine.org/viewtopic.php?f=25&t=1807705)
        setTimeout(() => {
            if (jQuery(document.activeElement.parentElement).hasClass('js-surveyhero-embed')) {
                wp.data.dispatch('core/editor').selectBlock(props.clientId);
            }
        })
    });
}

/**
 * Register Block
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available in the editor.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api
 * @param  {string}     name        Block name
 * @param  {Object}     settings    Block settings
 */
registerBlockType('surveyhero/embed', {
    title: 'SurveyHero',
    description: 'Embed online surveys into your WordPress website',
    icon: getIcon(),
    category: 'embed',
    keywords: ['survey', 'poll'],

    supports: {
        multiple: false,
        html: false,
        reusable: false
    },

    attributes: {
        id: {
            default: '',
            type: 'string'
        },
        code: {
            default: '',
            type: 'string'
        },
        script_url: {
            default: '',
            type: 'string'
        }
    },

    /**
     * The edit function describes the structure of the block in the context of the editor.
     * This represents what the editor will render when the block is used.
     *
     * The "edit" property must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save
     */
    edit: (props) => {
        initBlockSelectionOnIframeClick(props);

        return <EmbedSettings block={props}/>;
    },

    /**
     * The save function defines the way in which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save
     */
    save: (props) => {
        return (
            props.attributes.id !== '' &&
            <div id={'surveyhero-embed-' + props.attributes.id} className={'js-surveyhero-embed surveyhero-embed'} data-script={props.attributes.script_url}/>
        );
    },
});
