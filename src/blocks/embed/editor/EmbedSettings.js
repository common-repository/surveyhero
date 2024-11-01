import {SurveyToolbar} from "./Toolbar";

const VIEW_CHANGE_DELAY = 400;
const {BlockControls} = wp.blockEditor;
const {Fragment} = wp.element;
const {Spinner, Dashicon} = wp.components;

function removeQuotes(text) {
    return text.replace(/"/g, '');
}

function getIdFromText(text) {
    if (typeof text !== 'string') {
        return null;
    }

    let items = removeQuotes(text).split('-'),
        code = items[2];

    return typeof code === 'string' ? code : null;
}

function getScriptFromText(text) {
    if (typeof text !== 'string') {
        return null;
    }

    return removeQuotes(text);
}

function getData(code) {
    let text = code.match(/"(.*?)"/g);

    return text ? {
        id: getIdFromText(text[0]),
        script_url: getScriptFromText(text[1])
    } : null;
}

export class EmbedSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            block: props.block,
            code: props.block.attributes.code,
            id: props.block.attributes.id,
            script_url: props.block.attributes.script_url,
            activeView: ''
        };
    }

    componentDidMount() {
        this.state.id !== '' ? this.showSurvey() : this.show('editing');
    }

    show(view_name, delay = 0) {
        setTimeout(() => {
            this.setState({activeView: view_name});
        }, delay)
    }

    handleSubmit(e) {
        e.preventDefault();

        this.show('loading');

        let data = getData(this.state.code);

        if (data && data.id && data.script_url) {
            let newState = {
                id: data.id,
                code: this.state.code,
                script_url: data.script_url,
            };

            this.setState(newState);
            this.state.block.setAttributes(newState);
            this.showSurvey();
        } else {
            this.show('error', VIEW_CHANGE_DELAY);
        }
    }

    showSurvey() {
        setTimeout(() => {
            this.show('active');
            jQuery.getScript(this.state.script_url);
        }, VIEW_CHANGE_DELAY);
    }

    render() {
        return (
            <Fragment>
                <div className={'surveyhero-embed-settings'}>
                    {
                        this.state.activeView === 'active' &&
                        <div>
                            <BlockControls>
                                <SurveyToolbar onEdit={() => this.show('editing')}/>
                            </BlockControls>
                            <div id={'surveyhero-embed-' + this.state.id} className={'js-surveyhero-embed surveyhero-embed-frame'}/>
                        </div>
                    }

                    {
                        this.state.activeView === 'editing' &&
                        <form onSubmit={(event) => this.handleSubmit(event)} className="surveyhero-editor-box">
                            <label className="surveyhero-embed-label" htmlFor="surveyhero-embed-code">
                                Enter your SurveyHero Embed Code
                            </label>
                            <textarea id="surveyhero-embed-code"
                                      value={this.state.code}
                                      onFocus={(event) => event.target.select()}
                                      onChange={(event) => this.setState({code: event.target.value})}
                                      className="components-placeholder__input"
                                      required
                                      autoComplete="off"
                                      autoFocus
                            />
                            <button type="submit" className="components-button is-primary surveyhero-embed-button is-button is-default is-large">Embed</button>
                        </form>
                    }

                    {
                        this.state.activeView === 'error' &&
                        <div className="surveyhero-editor-box surveyhero-error-box">
                            <Dashicon icon="warning" size="60" className="surveyhero-error-icon"/>
                            <h2>Oops, that code did not work!</h2>
                            <p>Did you copy it from your SurveyHero Embed Collector settings?</p>
                            <button className="components-button is-secondary is-button is-default is-large" onClick={() => this.show('editing')}>Try again</button>
                        </div>
                    }

                    {
                        this.state.activeView === 'loading' &&
                        <div className="surveyhero-editor-box">
                            <Spinner/>
                        </div>
                    }
                </div>
            </Fragment>
        );
    }
}